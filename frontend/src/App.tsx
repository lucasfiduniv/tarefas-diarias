import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import { useEffect, useState } from "react";
import api from "./services/api";

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

function App() {
  const [summary, setSummary] = useState<SummaryData | null>(null); 

  useEffect(() => {
    const request = async () => {
      try {
        const response = await api.get<ApiResponse>("summary");
        setSummary(response.data.summary[0]); 
      } catch (error) {
        console.error(error);
      }
    };
    request();
  }, []);

  return (
    <Dialog>
      {summary === null ? (
        <CreateGoal />
      ) : (
        <Summary summaryData={summary} /> 
      )}
    </Dialog>
  );
}

export default App;
