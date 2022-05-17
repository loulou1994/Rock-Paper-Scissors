import React from "react";

function Score({score, logo}){
    return (
        <header className="header flex">
            <h1 className="header__heading"><span className="sr-only">ROCK PAPER SCISSORS</span>
            <img src={require(`../assets/${logo}.svg`)} alt='logo'/>
            </h1>
            <button className="header__score flex">SCORE
                <span className="result">
                    {score}
                </span>
            </button>
        </header>
    )
}
export default Score