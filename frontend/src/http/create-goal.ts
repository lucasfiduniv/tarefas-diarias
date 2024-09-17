import api from "../services/api";

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}
export function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  return api.post(`/goals`, {
    title,
    desiredWeeklyFrequency,
  });
}
