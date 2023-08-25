import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App bg-blue-100">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <h1>THis is our project</h1>
    </div>
  );
}

export default App;
