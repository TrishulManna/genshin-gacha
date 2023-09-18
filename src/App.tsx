import Form from "./components/form";
import Results from "./components/results";
import "./index.css"
import { useState } from "react";

function App() {
  const [receivedData, setReceivedData] = useState<any[]>([]);

  const handleDataFromChild = (data:any) => {        
      setReceivedData([...data]); 
  };

  return (
    <section className="bg-white w-full h-full max-h-fit m-auto p-10 grid gap-10 overflow-hidden shadow-md grid-rows-2
      sm:w-[80vw] sm:h-[80vh] sm:rounded-[32px] sm:grid-cols-2 sm:grid-rows-none">
        <Form sendDataToParent={handleDataFromChild}></Form>
        <Results receivedData={receivedData}></Results>
    </section>
  );
}

export default App;
