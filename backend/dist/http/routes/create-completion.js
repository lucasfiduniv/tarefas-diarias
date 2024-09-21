"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompletionRoute = void 0;
const zod_1 = __importDefault(require("zod"));
const create_goal_completion_1 = require("../../functions/create-goal-completion");
const createCompletionRoute = async (app) => {
    app.post('/goal-completions', { schema: { body: zod_1.default.object({ goalId: zod_1.default.string() }) } }, async (request) => {
        const { goalId } = request.body;
        await (0, create_goal_completion_1.createGoalCompletion)({ goalId });
    });
};
exports.createCompletionRoute = createCompletionRoute;
//# sourceMappingURL=create-completion.js.map