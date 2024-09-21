"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const _1 = require(".");
const schema_1 = require("./schema");
async function seed() {
    await _1.db.delete(schema_1.goalCompletations);
    await _1.db.delete(schema_1.goals);
    const result = await _1.db
        .insert(schema_1.goals)
        .values([
        {
            title: 'Teste 1',
            desiredWeeklyFrequency: 2,
        },
        {
            title: 'Teste 2',
            desiredWeeklyFrequency: 3,
        },
        {
            title: 'Teste 3',
            desiredWeeklyFrequency: 4,
        },
    ])
        .returning();
    const startOfWeek = (0, dayjs_1.default)().startOf('week');
    await _1.db.insert(schema_1.goalCompletations).values([
        {
            goalId: result[0].id,
            completedAt: startOfWeek.toDate(),
        },
        {
            goalId: result[1].id,
            completedAt: startOfWeek.add(1, 'day').toDate(),
        },
        {
            goalId: result[2].id,
            completedAt: startOfWeek.add(2, 'day').toDate(),
        },
    ]);
}
seed().finally(() => _1.client.end());
seed();
//# sourceMappingURL=seed.js.map