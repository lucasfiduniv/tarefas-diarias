
import {
  Dialog,
} from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { EmptyGoals } from "./components/empity-goals";
import { Summary } from "./components/summary";

function App() {
  return (
    <Dialog>
     {/* <EmptyGoals/> */}
     <Summary/>
     <CreateGoal/>
    </Dialog>
  );
}

export default App;
