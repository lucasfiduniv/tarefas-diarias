import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { goalCompletations, goals } from '../db/schema'

export async function getWeekPendingGoals() {
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

  const goalCompletationCounts = db.$with('goal_completation_counts').as(
    db
      .select({
        goalId: goalCompletations.goalId,
        completationCount: count(goalCompletations.id).as('completation_count'),
      })
      .from(goalCompletations)
      .where(
        and(
          gte(goalCompletations.completedAt, firstDayOfTheWeek),
          lte(goalCompletations.completedAt, lastDayOfTheWeek)
        )
      )

      .groupBy(goalCompletations.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalCompletationCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completationCount: sql`
      COALESCE(${goalCompletationCounts.completationCount}, 0)`.mapWith(Number),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalCompletationCounts,
      eq(goalsCreatedUpToWeek.id, goalCompletationCounts.goalId)
    )
  return { pendingGoals }
}
