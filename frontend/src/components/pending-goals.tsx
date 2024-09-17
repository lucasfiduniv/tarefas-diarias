import { useQuery } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";
import { OutlineButton } from "./ui/outline-button";
import { Plus } from "lucide-react";

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  });
  if (!data) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton>
            <Plus className="size-4" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
