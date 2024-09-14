import api from "../services/api";

interface Goal {
  goalId: string;
  title: string;
  completedAt: string;
}

interface SummaryData {
  completed: number;
  total: number;
  goalsPerDay: {
    [date: string]: Goal[];
  };
}

interface ApiResponse {
  summary: SummaryData[];
}

export async function getSummury(): Promise<SummaryData[]> {
  const response = await api.get<ApiResponse>("/summary");
  const data = await response.data;

  return data.summary;
}
