"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekSummary = getWeekSummary;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const dayjs_1 = __importDefault(require("dayjs"));
async function getWeekSummary() {
    const firstDayOfTheWeek = (0, dayjs_1.default)().startOf("week").toDate();
    const lastDayOfTheWeek = (0, dayjs_1.default)().endOf("week").toDate();
    const goalsCreatedUpToWeek = db_1.db.$with("goals_created_up_to_week").as(db_1.db
        .select({
        id: schema_1.goals.id,
        title: schema_1.goals.title,
        desiredWeeklyFrequency: schema_1.goals.desiredWeeklyFrequency,
        createdAt: schema_1.goals.createdAt,
    })
        .from(schema_1.goals)
        .where((0, drizzle_orm_1.lte)(schema_1.goals.createdAt, lastDayOfTheWeek)));
    const goalsCompletedInWeek = db_1.db.$with("goals_completed_in_week").as(db_1.db
        .select({
        goalId: schema_1.goalCompletations.goalId,
        title: schema_1.goals.title,
        completedAt: schema_1.goalCompletations.completedAt,
        completedAtDate: (0, drizzle_orm_1.sql) `DATE(${schema_1.goalCompletations.completedAt})`
            .mapWith(Date)
            .as("completed_at_date"),
    })
        .from(schema_1.goalCompletations)
        .innerJoin(schema_1.goals, (0, drizzle_orm_1.eq)(schema_1.goals.id, schema_1.goalCompletations.goalId))
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.gte)(schema_1.goalCompletations.completedAt, firstDayOfTheWeek), (0, drizzle_orm_1.lte)(schema_1.goalCompletations.completedAt, lastDayOfTheWeek)))
        .groupBy(schema_1.goalCompletations.goalId, schema_1.goals.title, schema_1.goalCompletations.completedAt));
    const goalsCompletedByWeekDay = db_1.db.$with("goals_completed_by_week_day").as(db_1.db
        .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: (0, drizzle_orm_1.sql) `JSON_AGG(JSON_BUILD_OBJECT(
          'goalId', ${goalsCompletedInWeek.goalId}, 
          'title', ${goalsCompletedInWeek.title}, 
          'completedAt', ${goalsCompletedInWeek.completedAt}))`.as("completions"),
    })
        .from(goalsCompletedInWeek)
        .groupBy(goalsCompletedInWeek.completedAtDate));
    const result = await db_1.db
        .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
        .select({
        completed: (0, drizzle_orm_1.sql) `(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(Number),
        total: (0, drizzle_orm_1.sql) `(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(Number),
        goalsPerDay: (0, drizzle_orm_1.sql) `JSON_OBJECT_AGG(${goalsCompletedByWeekDay.completedAtDate}, ${goalsCompletedByWeekDay.completions})`,
    })
        .from(goalsCompletedByWeekDay);
    return {
        summary: result,
    };
}
//# sourceMappingURL=get-week-summary.js.map