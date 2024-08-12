import React, { useCallback, useMemo } from "react";
import "./rps.css";
import rockbtn from "../Assets/rock.png";
import paperbtn from "../Assets/paper.png";
import scissorbtn from "../Assets/scissor.png";
import stonehand from "../Assets/stonehand.png";
import paperhand from "../Assets/paperhand.png";
import scisshand from "../Assets/scisshand.png";
import resetimg from "../Assets/reset.svg";
import { useState } from "react";
interface point {
  userpoint: number;
  cpupoint: number;
}
const RockPaperScissor: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [points, setPoints] = useState<point>({ userpoint: 0, cpupoint: 0 });

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setGameResult(null);
    setPoints({ userpoint: 0, cpupoint: 0 });
  };

  const choices = ["rock", "paper", "scissors"];

  useMemo(() => {
    if (points.userpoint > 2) {
      setGameResult("You Won");
    } else if (points.cpupoint > 2) {
      setGameResult("you lose");
    }
    console.log("changep");
  }, [points]);
  console.log(points, gameResult, choices);
  const handleChoice = (choice: string) => {
    setPlayerChoice(choice);
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerChoice);

    if (
      (choice === "rock" && computerChoice === "scissors") ||
      (choice === "paper" && computerChoice === "rock") ||
      (choice === "scissors" && computerChoice === "paper")
    ) {
      setPoints((prev) => ({
        ...prev,
        userpoint: prev.userpoint + 1,
      }));
    } else {
      setPoints((prev) => ({
        ...prev,
        cpupoint: prev.cpupoint + 1,
      }));
    }
  };

  return (
    <div className="rps-outer">
      <div className="rps-display">
        <div className="rps-points">
          <div className="rps-player">
            <span>Player: {points.userpoint}</span>
          </div>
          <div className="rps-cpu">
            <span>CPU: {points.cpupoint}</span>
          </div>
        </div>
        <div className="rps-results">
          {gameResult&&(<><span>{gameResult}</span><span
            onClick={() => {
              reset()
            }}
          >
            <img src={resetimg} width={24} alt="reset img" />
          </span></>)}
          
        </div>
        <div className="rps-gamescreen">
          <div>
            {playerChoice &&
              (playerChoice === "rock" ? (
                <img src={stonehand} />
              ) : playerChoice === "paper" ? (
                <img src={paperhand} />
              ) : playerChoice === "scissors" ? (
                <img src={scisshand} />
              ) : (
                ""
              ))}
          </div>
          <div className="rps-cpuhand">
            {computerChoice &&
              (computerChoice === "rock" ? (
                <img src={stonehand} />
              ) : computerChoice === "paper" ? (
                <img src={paperhand} />
              ) : computerChoice === "scissors" ? (
                <img src={scisshand} />
              ) : (
                ""
              ))}
          </div>
        </div>
      </div>
      <div className="rps-actions">
        <div
          className="rps-rock"
          onClick={() => {
            handleChoice("rock");
          }}
        >
          <img src={rockbtn} className="rps-rock" alt="" />
        </div>
        <div
          className="rps-paper"
          onClick={() => {
            handleChoice("paper");
          }}
        >
          <img src={paperbtn} className="rps-paper" alt="" />
        </div>
        <div
          className="rps-scissor"
          onClick={() => {
            handleChoice("scissors");
          }}
        >
          <img src={scissorbtn} className="rps-scissor" alt="" />
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissor;
