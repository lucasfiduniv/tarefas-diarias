import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { CreateGoal } from "./create-goal";

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <img src="/logo-empityScreen.svg" alt="Logo" />
      <img src="/lets-start.svg" alt="Logo" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
        <CreateGoal />
      </Dialog>
    </div>
  );
}
