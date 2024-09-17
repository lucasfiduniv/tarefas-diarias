import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { PendingGoals } from "./pending-goals";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { CreateGoal } from "./create-goal";
dayjs.locale("pt-br");

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
    } | null;
  };
}

export function Summary({ summaryData }: SummaryProps) {
  const { completed, total, goalsPerDay } = summaryData;
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  const firstDayOfTheWeek = dayjs().startOf("week").format("DD/MMM");
  const lastDayOfTheWeek = dayjs().endOf("week").format("DD/MMM");

  const dates =
    goalsPerDay && Object.keys(goalsPerDay).length > 0
      ? Object.keys(goalsPerDay).sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime()
        )
      : [];

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InOrbitIcon />
          <span className="text-lg font-semibold">
            {firstDayOfTheWeek} - {lastDayOfTheWeek}
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4" />
              Cadastrar Meta
            </Button>
          </DialogTrigger>
          <CreateGoal />
        </Dialog>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={completed} max={total}>
          <ProgressIndicator style={{ width: `${progressPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">{completed}</span> de{" "}
            <span className="text-zinc-100">{total}</span> metas nessa semana.
          </span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2>Sua Semana</h2>

          {dates.length > 0 ? (
            dates.map((date) => (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  {dayjs(date).format("dddd, D [de] MMMM")}
                </h3>
                <ul className="flex flex-col gap-3">
                  {goalsPerDay &&
                    goalsPerDay[date]
                      .sort(
                        (a, b) =>
                          new Date(b.completedAt).getTime() -
                          new Date(a.completedAt).getTime()
                      )
                      .map((goal) => (
                        <li
                          key={goal.goalId}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="text-sm text-zinc-400">
                            Você completou{" "}
                            <span className="text-zinc-100">{goal.title}</span>{" "}
                            às{" "}
                            <span className="text-zinc-100">
                              {dayjs(goal.completedAt).format("HH:mm")}
                            </span>
                          </span>
                        </li>
                      ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-zinc-400">
              Não há metas para exibir nesta semana.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
