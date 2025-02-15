import React from "react";
import Timer from "./components/Timer";
import "./styles.css"; // Import custom styles

const App = () => {
  return (
    <div>
      <h1 className="app-title">Project Lulia</h1>
      <div className="timer-container">
        <Timer />
      </div>
    </div>
  );
};

export default App;
