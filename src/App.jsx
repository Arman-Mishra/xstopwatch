import { useState, useEffect, useRef } from "react";
import "./App.css";

const format = (timer) => {
  const mins = Math.floor(timer / 60);
  const secs = timer % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

function App() {
  const [timer, setTimer] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (isActivated) {
        setTimer((prevTime) => prevTime + 1);
      } else {
        clearInterval(timerId.current);
      }
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, [isActivated, timer]);

  const buttonHandler = (e) => {
    if (e.target.innerText === "Start") {
      setIsActivated(true);
    } else if (e.target.innerText === "Stop") {
      setIsActivated(false);
    } else if (e.target.innerText === "Reset") {
      setTimer(0);
      setIsActivated(false);
    }
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <p style={{ fontSize: "1.2rem" }}>
        Time: <span>{format(timer)}</span>
      </p>
      <button style={{ fontSize: "1rem" }} onClick={buttonHandler}>
        {isActivated ? "Stop" : "Start"}
      </button>
      <button
        style={{ fontSize: "1rem", marginLeft: "10px" }}
        onClick={buttonHandler}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
