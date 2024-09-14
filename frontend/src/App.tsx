import { Plus, X } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";

function App() {
  return (
    <Dialog>
      <div className="h-screen flex flex-col justify-center items-center gap-8">
        <img src="/logo-empityScreen.svg" alt="Logo" />
        <img src="/lets-start.svg" alt="Logo" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora
          mesmo?
        </p>
        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Cadastrar Meta</DialogTitle>
              <DialogClose>
                <X className="size-5 text-zinc-600" />
              </DialogClose>
            </div>
            <DialogDescription>
              Adicione atividades que te fazem bem e que você quer continuar
              praticando toda semana.
            </DialogDescription>
          </div>
          <form action="" className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a Atividade?</Label>
              <Input id="title" autoFocus placeholder="Praticar exercicios, meditar, etc..."/>
              </div>
              <div className="flex flex-col gap-2">
              <Label>Quantas vezes na semana</Label>
              <RadioGroup>
                <RadioGroupItem value="1">
1x na semana
                </RadioGroupItem>
              </RadioGroup>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="flex-1">
                  Fechar
                </Button>
              </DialogClose>
              <Button className="flex-1">Salvar</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default App;
