import { timestamp } from 'drizzle-orm/pg-core'
import { integer, text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const goals = pgTable('goals', {
  id: text('goal_id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const goalCompletations = pgTable('goal_completions', {
  id: text('goal_completion_id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text('goal_id')
    .references(() => goals.id)
    .notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})
