import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";

interface Goal {
  goalId: string;
  title: string;
  completedAt: string;
}

interface SummaryProps {
  summaryData: {
    completed: number;
    total: number;
    goalsPerDay: {
      [date: string]: Goal[];
    };
  };
}

export function Summary({ summaryData }: SummaryProps) {
  const { completed, total, goalsPerDay } = summaryData;
  const progressPercentage = (completed / total) * 100;

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InOrbitIcon />
          <span className="text-lg font-semibold">Resumo das Metas</span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>
      
      <div className="flex flex-col gap-3">
        <Progress value={completed} max={total}>
          <ProgressIndicator style={{ width: `${progressPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xm text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">{completed}</span> de{" "}
            <span className="text-zinc-100">{total}</span> metas nessa semana.
          </span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>

        <Separator />
        
        <div className="flex flex-wrap gap-3">
          <OutlineButton>
            <Plus className="size-4" />
            Meditar
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4" />
            Nadar
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4" />
            Praticar Exercicio
          </OutlineButton>
        </div>

        <div className="flex flex-col gap-6">
          <h2>Sua Semana</h2>
          {Object.entries(goalsPerDay).map(([date, goals]) => (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                {new Date(date).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h3>
              <ul className="flex flex-col gap-3">
                {goals.map((goal) => (
                  <li key={goal.goalId} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-pink-500" />
                    <span className="text-sm text-zinc-400">
                      Você completou{" "}
                      <span className="text-zinc-100">{goal.title}</span> às{" "}
                      <span className="text-zinc-100">
                        {new Date(goal.completedAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
