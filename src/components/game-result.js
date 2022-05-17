import React, {useEffect} from "react"
import ResultComponent from "./resultComponent"

function Result({items, computerPick, displayResult}){
  let pickedItemsStyle = {
    player: {},
    computer: {}
  };

  useEffect(() => {
    setTimeout(() => {
      computerPick()
      setTimeout(() => {
        displayResult()
      }, 1500)
    }, 2000)
  }, []);

  checkPickedItem()

  function checkPickedItem(){
    for(const [player, item] of Object.entries(items)){
      if(item === "paper"){
        pickedItemsStyle[player].borderColor = !(items.winner === player) ? "hsl(230, 89%, 62%)" : "hsl(230, 89%, 65%)" 
        
      }else if (item === "rock"){
        pickedItemsStyle[player].borderColor = !(items.winner === player) ? "hsl(349, 71%, 52%)" : "hsl(349, 70%, 56%)"

      }else if (item === "scissors"){
        pickedItemsStyle[player].borderColor = !(items.winner === player) ? "hsl(39, 89%, 49%)" : "hsl(40, 84%, 53%)"

      }else if (item === "spock"){
        pickedItemsStyle[player].borderColor = !(items.winner === player) ? "hsl(189, 59%, 53%)" : "hsl(189, 59%, 70%)"

      }else if (item === "lizard"){
        pickedItemsStyle[player].borderColor = !(items.winner === player) ? "hsl(261, 73%, 60%" : "hsl(261, 73%, 80%)"
    }
  }
}
  return (
    <>
      <section className="game--result grid">
        <div className="game--item flex">
          <div style={pickedItemsStyle.player} className="player--item flex">
            {items.winner === "player" && <div className="winner-circle"></div>}
            <img src={require(`../assets/icon-${items.player}.svg`)} alt="game-item"/>
          </div>
          <p>YOU PICKED</p>
        </div>

        <div style={items.computer ? {gap: "1.5rem"} : undefined} className="game--item flex">
          {
            items.computer ? <div style={pickedItemsStyle.computer} className="player--item flex">
                      <img src={require(`../assets/icon-${items.computer}.svg`)} alt="game-item"/>
                      {items.winner === "computer" && <div className="winner-circle"></div>}
                    </div>
                    :
                    <div className="empty-item"></div>
          }
          <p>THE HOUSE PICKED</p>
        </div>
        { items.showResult && <ResultComponent/> }
      </section>
    </>
  )
}
export default Result