import "./App.css";
import "./components/modal.css";
import Todo from "./components/todo";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const closeModalHandler = () => {
    setShow(false);
  };
  return (
    <div className="container">
      {show ? (
        <div onClick={closeModalHandler} className="back-drop"></div>
      ) : null}
      <Todo />
    </div>
  );
}

export default App;
