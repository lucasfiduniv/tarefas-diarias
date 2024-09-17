import api from "../services/api";

export function createGoalCompletion(goalId: string) {
  return api.post(`/goal-completions`, {
    goalId: goalId,
  });
}
