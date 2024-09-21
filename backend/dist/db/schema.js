"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalCompletations = exports.goals = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const cuid2_1 = require("@paralleldrive/cuid2");
exports.goals = (0, pg_core_3.pgTable)('goals', {
    id: (0, pg_core_2.text)('goal_id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    title: (0, pg_core_2.text)('title').notNull(),
    desiredWeeklyFrequency: (0, pg_core_2.integer)('desired_weekly_frequency').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.goalCompletations = (0, pg_core_3.pgTable)('goal_completions', {
    id: (0, pg_core_2.text)('goal_completion_id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    goalId: (0, pg_core_2.text)('goal_id')
        .references(() => exports.goals.id)
        .notNull(),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
});
//# sourceMappingURL=schema.js.map