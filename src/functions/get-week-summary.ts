import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletations, goals } from '../db/schema'
import dayjs from 'dayjs'

export async function getWeekSummary() {
  const firstDayOfTheWeek = dayjs().startOf('week').toDate()
  const lastDayOfTheWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfTheWeek))
  )

  const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
    db
      .select({
        goalId: goalCompletations.goalId,
        title: goals.title,
        completedAt: goalCompletations.completedAt,
        completedAtDate: sql`DATE(${goalCompletations.completedAt})`
          .mapWith(Date)
          .as('completed_at_date'),
      })
      .from(goalCompletations)
      .innerJoin(goals, eq(goals.id, goalCompletations.goalId))
      .where(
        and(
          gte(goalCompletations.completedAt, firstDayOfTheWeek),
          lte(goalCompletations.completedAt, lastDayOfTheWeek)
        )
      )
      .groupBy(
        goalCompletations.goalId,
        goals.title,
        goalCompletations.completedAt
      )
  )

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql`JSON_AGG(JSON_BUILD_OBJECT(
          'goalId', ${goalsCompletedInWeek.goalId}, 
          'title', ${goalsCompletedInWeek.title}, 
          'completedAt', ${goalsCompletedInWeek.completedAt}))`.as(
          'completions'
        ),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
  )

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
    })
    .from(goalsCompletedByWeekDay)

  return {
    summary: result,
  }
}
