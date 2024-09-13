import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletations, goals } from '../db/schema'
import dayjs from 'dayjs'

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfTheWeek = dayjs().startOf('week').toDate()
  const lastDayOfTheWeek = dayjs().endOf('week').toDate()
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

  const result = await db
    .with(goalCompletationCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completationCount: sql`
      COALESCE(${goalCompletationCounts.completationCount}, 0)`.mapWith(Number),
    })
    .from(goals)
    .leftJoin(
      goalCompletationCounts,
      eq(goalCompletationCounts.goalId, goals.id)
    )
    .where(eq(goals.id, goalId))

  const { completationCount, desiredWeeklyFrequency } = result[0]
  if (completationCount >= desiredWeeklyFrequency) {
    throw new Error('Goal already completed')
  }

  const insertResult = await db
    .insert(goalCompletations)
    .values({ goalId })
    .returning()
  const goalCompletation = insertResult[0]

  return { goalCompletation }
}
