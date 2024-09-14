import { Plus } from "lucide-react";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-8">
        <img src="/logo-empityScreen.svg" alt="Logo" />
        <img src="/lets-start.svg" alt="Logo" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>
        <button type="button" className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-2"><Plus className="size-4"/>Cadastrar Meta</button>
      </div>
    </>
  );
}

export default App;
