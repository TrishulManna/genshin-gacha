import Form from "./components/form";
import Results from "./components/results";

import "./index.css"

function App() {
  return (
    <section className="bg-white max-w-4xl w-[60vw] h-[80vh] max-h-fit m-auto rounded-[32px] p-10 flex justify-between gap-2.5">
        <Form></Form>
        <Results></Results>
    </section>
  );
}

export default App;
