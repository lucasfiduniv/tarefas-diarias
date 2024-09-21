"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekPendingGoals = getWeekPendingGoals;
const dayjs_1 = __importDefault(require("dayjs"));
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
async function getWeekPendingGoals() {
    const firstDayOfTheWeek = (0, dayjs_1.default)().startOf('week').toDate();
    const lastDayOfTheWeek = (0, dayjs_1.default)().endOf('week').toDate();
    const goalsCreatedUpToWeek = db_1.db.$with('goals_created_up_to_week').as(db_1.db
        .select({
        id: schema_1.goals.id,
        title: schema_1.goals.title,
        desiredWeeklyFrequency: schema_1.goals.desiredWeeklyFrequency,
        createdAt: schema_1.goals.createdAt,
    })
        .from(schema_1.goals)
        .where((0, drizzle_orm_1.lte)(schema_1.goals.createdAt, lastDayOfTheWeek)));
    const goalCompletationCounts = db_1.db.$with('goal_completation_counts').as(db_1.db
        .select({
        goalId: schema_1.goalCompletations.goalId,
        completationCount: (0, drizzle_orm_1.count)(schema_1.goalCompletations.id).as('completation_count'),
    })
        .from(schema_1.goalCompletations)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.gte)(schema_1.goalCompletations.completedAt, firstDayOfTheWeek), (0, drizzle_orm_1.lte)(schema_1.goalCompletations.completedAt, lastDayOfTheWeek)))
        .groupBy(schema_1.goalCompletations.goalId));
    const pendingGoals = await db_1.db
        .with(goalsCreatedUpToWeek, goalCompletationCounts)
        .select({
        id: goalsCreatedUpToWeek.id,
        title: goalsCreatedUpToWeek.title,
        desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
        completationCount: (0, drizzle_orm_1.sql) `
      COALESCE(${goalCompletationCounts.completationCount}, 0)`.mapWith(Number),
    })
        .from(goalsCreatedUpToWeek)
        .leftJoin(goalCompletationCounts, (0, drizzle_orm_1.eq)(goalsCreatedUpToWeek.id, goalCompletationCounts.goalId));
    return { pendingGoals };
}
//# sourceMappingURL=get-week-pending-goals.js.map