import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import runningSprite from "../assets/running-girl-sprite.png"; // ✅ Correct Image Import

const Timer = () => {
  const userName = "Lulia"; // Can be made dynamic later
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [cycles, setCycles] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [autoStart, setAutoStart] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [cheering, setCheering] = useState(false);

  const focusMessages = [
    `You got this, ${userName}!`,
    `Stay focused, ${userName}!`,
    `Keep pushing forward, ${userName}!`,
    `You're doing amazing, ${userName}!`,
    `Keep up the great work, ${userName}!`,
    `Almost there, ${userName}!`,
    `Stay strong, ${userName}!`,
    `Believe in yourself, ${userName}!`,
    `You’re capable of amazing things, ${userName}!`,
    `Keep that momentum going, ${userName}!`,
    `Stay in the zone, ${userName}!`,
    `One step at a time, ${userName}!`,
    `Your effort is paying off, ${userName}!`,
    `Every second counts, ${userName}!`,
    `Just keep going, ${userName}!`,
    `You're unstoppable, ${userName}!`,
    `Keep that brain sharp, ${userName}!`,
    `You're making progress, ${userName}!`,
    `Stay disciplined, ${userName}!`,
    `Trust yourself, ${userName}!`,
    `One Pomodoro at a time, ${userName}!`,
    `You're on fire, ${userName}! 🔥`,
    `Stay motivated, ${userName}!`,
    `You are stronger than distractions, ${userName}!`,
    `Get in the flow, ${userName}!`,
    `This is your time to shine, ${userName}!`,
    `Stay consistent, ${userName}!`,
    `Keep your eyes on the goal, ${userName}!`,
    `Every moment counts, ${userName}!`,
  ];

  const breakMessages = [
    `Take a deep breath, ${userName}!`,
    `Relax and recharge, ${userName}!`,
    `You’ve earned this break, ${userName}!`,
    `Give yourself a moment, ${userName}!`,
    `Time to refresh, ${userName}!`,
    `Step away and reset, ${userName}!`,
    `You’re doing great, ${userName}!`,
    `Let your mind relax, ${userName}!`,
    `A small pause leads to big success, ${userName}!`,
    `Enjoy this moment, ${userName}!`,
    `Stretch and breathe, ${userName}!`,
    `Your brain deserves a break, ${userName}!`,
    `Hydrate and move, ${userName}!`,
    `Good work! Now take a moment, ${userName}!`,
    `Reset and get ready for more greatness, ${userName}!`,
    `Success is built on smart breaks, ${userName}!`,
    `Take this time to refresh, ${userName}!`,
    `Well done! Now breathe, ${userName}!`,
    `You’ve made progress, ${userName}! Keep going!`,
    `Reward yourself with this short rest, ${userName}!`,
    `Breaks fuel productivity, ${userName}!`,
    `You’re pacing yourself perfectly, ${userName}!`,
  ];

  // Update time left when work/break durations change
  useEffect(() => {
    setTimeLeft(isWorkSession ? workDuration * 60 : breakDuration * 60);
  }, [workDuration, breakDuration, isWorkSession]);

  // Timer countdown logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Show an encouraging message every 10 seconds
    if (timeLeft % 10 === 0 && timeLeft !== 0) {
      const messages = isWorkSession ? focusMessages : breakMessages;
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }

    // Handle session completion
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleSessionEnd();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSessionEnd = () => {
    if (isWorkSession) {
      setCompletedCycles((prev) => prev + 1);
      setShowConfetti(true);
      setCheering(true);

      setTimeout(() => {
        setShowConfetti(false);
        setCheering(false);
      }, 5000);

      if (completedCycles + 1 >= cycles) {
        alert(`All Pomodoro cycles completed! Take a long break, ${userName}.`);
        setIsRunning(false);
        setCompletedCycles(0);
      } else {
        setIsWorkSession(false);
        setTimeLeft(breakDuration * 60);
      }
    } else {
      setIsWorkSession(true);
      setTimeLeft(workDuration * 60);
    }

    if (autoStart) {
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setTimeLeft(workDuration * 60);
    setCompletedCycles(0);
    setMessage("");
    setShowConfetti(false);
    setCheering(false);
  };

  const progress = isWorkSession
    ? (timeLeft / (workDuration * 60)) * 100
    : (timeLeft / (breakDuration * 60)) * 100;

  return (
    <div className="timer-container">
      {showConfetti && <Confetti />}
      <h2 className="timer-title">{isWorkSession ? "Focus Time" : "Break Time"}</h2>
      <h1 className="timer">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </h1>

      {/* Progress Bar & Running Girl */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <img
          src={runningSprite} // ✅ Use imported image
          alt="Running Girl"
          className={`running-girl ${cheering ? "cheering" : ""}`}
          style={{ left: `${progress}%` }}
        />
      </div>

      {/* Speech Bubble for Encouraging Messages */}
      {message && <p className="speech-bubble">{message}</p>}

      {/* Timer Controls */}
      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      {/* Session Settings */}
      <div className="session-settings">
        <label>Work Duration:</label>
        <input type="number" value={workDuration} onChange={(e) => setWorkDuration(parseInt(e.target.value) || 25)} /> min

        <label>Break Duration:</label>
        <input type="number" value={breakDuration} onChange={(e) => setBreakDuration(parseInt(e.target.value) || 5)} /> min

        <label>Pomodoro Cycles:</label>
        <input type="number" value={cycles} onChange={(e) => setCycles(parseInt(e.target.value) || 4)} />
      </div>

      {/* Auto Start Checkbox */}
      <div className="auto-start">
        <label>Auto Start Next Session?</label>
        <input type="checkbox" checked={autoStart} onChange={() => setAutoStart(!autoStart)} />
      </div>

      {/* Session Progress */}
      <p className="session-progress">Completed Cycles: {completedCycles}/{cycles}</p>
    </div>
  );
};

export default Timer;
