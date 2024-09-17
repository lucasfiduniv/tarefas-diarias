import api from "../services/api";

type PendingGoalFromApi = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completationCount: number;
};

type PendingGoalsResponse = {
  pendingGoals: PendingGoalFromApi[];
};

export async function getPendingGoals(): Promise<PendingGoalFromApi[]> {
  const response = await api.get<PendingGoalsResponse>("/pending-goals");
  const data = response.data;

  return data.pendingGoals;
}
