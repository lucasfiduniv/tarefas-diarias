import { X } from "lucide-react";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

export function CreateGoal(){
  return(
    <DialogContent>
    <div className="flex flex-col gap-6 h-full">
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
            <Input
              id="title"
              autoFocus
              placeholder="Praticar exercicios, meditar, etc..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Quantas vezes na semana</Label>
            <RadioGroup>
              <RadioGroupItem value="1">
                <RadioGroupIndicator />
                <span className="text-zinc-300 text-sm font-medium learning-none">1x na semana</span>
                <span className="text-lg learning-none">
                🥱
                </span>
              </RadioGroupItem>

              <RadioGroupItem value="2">
                <RadioGroupIndicator />
                <span className="text-zinc-300 text-sm font-medium learning-none">2x na semana</span>
                <span className="text-lg learning-none">
                🥱
                </span>
              </RadioGroupItem>

              <RadioGroupItem value="3">
                <RadioGroupIndicator />
                <span className="text-zinc-300 text-sm font-medium learning-none">3x na semana</span>
                <span className="text-lg learning-none">
                🥱
                </span>
              </RadioGroupItem>

              <RadioGroupItem value="4">
                <RadioGroupIndicator />
                <span className="text-zinc-300 text-sm font-medium learning-none">4x na semana</span>
                <span className="text-lg learning-none">
                🥱
                </span>
              </RadioGroupItem>

              <RadioGroupItem value="5">
                <RadioGroupIndicator />
                <span className="text-zinc-300 text-sm font-medium learning-none">5x na semana</span>
                <span className="text-lg learning-none">
                🥱
                </span>
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
  )
}