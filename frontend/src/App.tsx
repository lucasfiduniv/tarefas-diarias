import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import { useQuery } from "@tanstack/react-query";
import { getSummury } from "./http/get-summury";

function App() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummury,
    staleTime: 1000 * 60,
  });
  return (
    <Dialog>
      {data && data.length > 0 ? (
        <Summary summaryData={data[0]} />
      ) : (
        <CreateGoal />
      )}
    </Dialog>
  );
}

export default App;
