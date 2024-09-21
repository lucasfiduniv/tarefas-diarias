"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoalCompletion = createGoalCompletion;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const dayjs_1 = __importDefault(require("dayjs"));
async function createGoalCompletion({ goalId, }) {
    const firstDayOfTheWeek = (0, dayjs_1.default)().startOf('week').toDate();
    const lastDayOfTheWeek = (0, dayjs_1.default)().endOf('week').toDate();
    const goalCompletationCounts = db_1.db.$with('goal_completation_counts').as(db_1.db
        .select({
        goalId: schema_1.goalCompletations.goalId,
        completationCount: (0, drizzle_orm_1.count)(schema_1.goalCompletations.id).as('completation_count'),
    })
        .from(schema_1.goalCompletations)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.gte)(schema_1.goalCompletations.completedAt, firstDayOfTheWeek), (0, drizzle_orm_1.lte)(schema_1.goalCompletations.completedAt, lastDayOfTheWeek)))
        .groupBy(schema_1.goalCompletations.goalId));
    const result = await db_1.db
        .with(goalCompletationCounts)
        .select({
        desiredWeeklyFrequency: schema_1.goals.desiredWeeklyFrequency,
        completationCount: (0, drizzle_orm_1.sql) `
      COALESCE(${goalCompletationCounts.completationCount}, 0)`.mapWith(Number),
    })
        .from(schema_1.goals)
        .leftJoin(goalCompletationCounts, (0, drizzle_orm_1.eq)(goalCompletationCounts.goalId, schema_1.goals.id))
        .where((0, drizzle_orm_1.eq)(schema_1.goals.id, goalId));
    const { completationCount, desiredWeeklyFrequency } = result[0];
    if (completationCount >= desiredWeeklyFrequency) {
        throw new Error('Goal already completed');
    }
    const insertResult = await db_1.db
        .insert(schema_1.goalCompletations)
        .values({ goalId })
        .returning();
    const goalCompletation = insertResult[0];
    return { goalCompletation };
}
//# sourceMappingURL=create-goal-completion.js.map