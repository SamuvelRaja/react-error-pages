import React, { useCallback, useMemo } from 'react'
import './rps.css'
import rockbtn from '../Assets/rock.png'
import paperbtn from '../Assets/paper.png'
import scissorbtn from '../Assets/scissor.png'
import { useState } from 'react'
interface point{
    userpoint:number;
    cpupoint:number;
}
const RockPaperScissor:React.FC = () => {
     const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [points, setPoints] = useState<point>({userpoint:0,cpupoint:0})

  const choices = ['rock', 'paper', 'scissors'];

    useCallback(()=>{
        if(points.userpoint>2){
            setGameResult('You Won')
        }else if(points.cpupoint>2){
            setGameResult('you lose')
        }
    },[points])
    console.log(points,gameResult)
  const handleChoice = (choice: string) => {
    setPlayerChoice(choice);
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerChoice);
    
   if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setPoints((prev)=>({
        ...prev,userpoint:prev.userpoint+1
      }))
    } else {
      setPoints((prev)=>({
        ...prev,cpupoint:prev.cpupoint+1
      }))
    }
  };

  return (
    <div className='rps-outer'>

        <div className="rps-display">
            <div className='rps-points'>
                <div className='rps-player'>
                    <span>Player:</span>
                </div>
                <div className="rps-cpu">
                    <span>CPU:</span>
                </div>
            </div>
            <div className="rps-results">
                {gameResult}
            </div>
            <div className='rps-gamescreen'>
                <div>
                    <img src={} alt="" />
                </div>
                <div>
                    <img src={} alt="" />
                </div>
            </div>
        </div>
        <div className='rps-actions'>
            <div className='rps-rock' onClick={()=>{handleChoice("rock")}}>
                <img src={rockbtn} className='rps-rock' alt="" />
            </div>
            <div className='rps-paper' onClick={()=>{handleChoice("paper")}}>
                <img src={paperbtn} className='rps-paper' alt="" />
            </div>
            <div className='rps-scissor' onClick={()=>{handleChoice("scissors")}}>
                <img src={scissorbtn} className='rps-scissor' alt="" />
            </div>
        </div>
    </div>
  )
}

export default RockPaperScissor
