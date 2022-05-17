import React, {useState, createContext, useEffect} from "react"
import GameModes from "./components/gameMode"
import HeaderScore from "./components/heading&Score"
import Playgame from "./components/game-body"
import Result from "./components/game-result"
import Rules from "./components/game-rules"

import { nanoid } from 'nanoid'
import gameModes from "./components/gameMode"

export const UserContext = createContext()

function App() {
  const [playersPick, setPlayersPick] = useState({
    mode: GameModes[1],
    player: "",
    computer: "",
    showResult: false,
    winner: "",
    score: JSON.parse(localStorage.getItem("score")) || 0
  });

  const [rulesToggler, setRulesToggler] = useState(false);
  const weapons = {
    rock: {
      wins: ["scissors", "lizard"]
    },
    paper: {
      wins: ["rock", "spock"]
    },
    scissors: {
      wins: ["paper", "lizard"]
    },

    spock: {
      wins: ["scissors", "rock"]
    },

    lizard: {
      wins: ["spock", "paper"]
    }
  }

  const itemsBtn = playersPick.mode.items.map(itemSet => {
    return <Playgame key={nanoid()}
                item={itemSet}
                clickHandler={updateItemChosen}
                gameMode={playersPick.mode.mode}
    />
  })

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(playersPick.score))
  }, [playersPick.score])

  function updateItemChosen(e){
    const clickedItem = e.currentTarget.id;
    setPlayersPick(prevState => ({...prevState, player: clickedItem}));
  }

  function choseRandomItem(){
    const items = playersPick.mode.items
    const itemIndex = Math.floor(Math.random() * items.length)
    return items[itemIndex]
  }

  function addScore(){
    setPlayersPick(prevState => ({...prevState, score: prevState.score + 1}))
  }

  function substractScore(){
    setPlayersPick(prevState => ({...prevState, score: prevState.score - 1}))
  }

  function computerUpdate(){
    setPlayersPick(prevState => {return {...prevState, computer: choseRandomItem()}})
  }
  
  function updateShowResult(){
    setPlayersPick(prevState => ({...prevState, showResult: !prevState.showResult}))
  }

  function rulesBoard(e){
    setRulesToggler(false)
  }

  function checkPlayerItems(){
    const beatItem = weapons[playersPick.player].wins.some(wins => wins === playersPick.computer)

    if(playersPick.player === playersPick.computer) return "Draw"

    if(beatItem){
      addScore()
      return "player"
    }else{
      substractScore()
      return "computer"
    }
  }

  function newGame(){
    setPlayersPick(prevState => ({
      mode: prevState.mode,
      player: "",
      computer: "",
      showResult: false,
      winner: "",
      score: prevState.score  
    }))
  }

  function updateWinner(){
    setPlayersPick(prevState => ({...prevState, winner: checkPlayerItems()}))
  }

  function toggleGameMode(){
    const mode = playersPick.mode === gameModes[1] ? gameModes[0] : gameModes[1]
    setPlayersPick(prevState => ({...prevState, mode: mode}))
  }

  return (
    <UserContext.Provider value={{"winner": playersPick.winner, updateWinner, newGame}}>
      <HeaderScore score={playersPick.score} logo={playersPick.mode.logo}/>
      <main className="flow">
        {!playersPick.player ?
        <section style={{backgroundImage: `url(${require(`./assets/${playersPick.mode.itemsBg}.svg`)})`}} className={"game grid " + playersPick.mode.mode}>
          {itemsBtn}
        </section> 
        :
          <Result items={playersPick} computerPick={computerUpdate} displayResult={updateShowResult} checkWinner={updateWinner}/>
        }
        <div className="btn-container flex">
          <button className="game-rules mode-btn" onClick={toggleGameMode}>Switch Mode</button>          
          <button className="game-rules" onClick={(e)=> { return setRulesToggler(true)} }>RULES</button>
        </div>
        {rulesToggler && <Rules clickHandler={rulesBoard} rulesImg={playersPick.mode.ruleImg}/>}
      </main>
    </UserContext.Provider>
  )
}

export default App;