import React from "react"
function Playgame({clickHandler, item, gameMode}){
    return (
        <>
          <button id={item} className={"game__item " + item + " " + gameMode} onClick={clickHandler}>
            <img src={require(`../assets/icon-${item}.svg`)} alt="item" />
            </button>
        </>
    )
}

export default Playgame