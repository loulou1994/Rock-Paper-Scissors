import React, { useContext, useEffect } from "react";

import { UserContext } from "../App"

export default function ResultComponent(){
  const {winner, updateWinner, newGame} = useContext(UserContext)
  let winnerText

  useEffect(() => {
    updateWinner()
  }, [])
  
  if(winner === "player"){
    winnerText = "YOU WIN"
  }else if(winner === "computer"){
    winnerText = "YOU LOSE"
  }else{
    winnerText = "Draw"
  }

  return (
    <div className="game--result__winner">
      <p className="winner-text">{winnerText}</p>
      <button className="winner-restart" onClick={newGame}>
          PLAY AGAIN
      </button>
    </div>
  )
}