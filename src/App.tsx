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
    <section className="bg-white max-w-4xl w-full h-full max-h-fit m-auto p-10 flex justify-between gap-10 flex-wrap overflow-hidden
      sm:w-[70vw] sm:h-[80vh] sm:rounded-[32px]">
        <Form sendDataToParent={handleDataFromChild}></Form>
        <Results receivedData={receivedData}></Results>
    </section>
  );
}

export default App;
