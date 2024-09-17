import { useQuery } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";
import { OutlineButton } from "./ui/outline-button";
import { Plus } from "lucide-react";
import { createGoalCompletion } from "../http/create-goal.completion";

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  });
  if (!data) return null;

  async function handleGoalCompletion(goalId: string) {
    await createGoalCompletion(goalId);
  }
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completationCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleGoalCompletion(goal.id)}
          >
            <Plus className="size-4" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
