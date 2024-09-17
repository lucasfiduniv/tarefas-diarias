import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import { useQuery } from "@tanstack/react-query";
import { getSummury } from "./http/get-summury";
import { EmptyGoals } from "./components/empity-goals";

function App() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummury,
    staleTime: 1000 * 60,
  });

  return (
    <>
      {data && data.length > 0 ? (
        <Summary summaryData={data[0]} />
      ) : (
        <EmptyGoals />
      )}
    </>
  );
}

export default App;
