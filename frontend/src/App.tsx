import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";

function App() {
  return (
    <Dialog>
      <div className="h-screen flex flex-col justify-center items-center gap-8">
        <img src="/logo-empityScreen.svg" alt="Logo" />
        <img src="/lets-start.svg" alt="Logo" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>
        <DialogTrigger asChild>
          <Button >
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        oi
      </DialogContent>
    </Dialog>

  );
}

export default App;
