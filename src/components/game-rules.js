import React from "react"

function Rules({clickHandler, rulesImg}){

    return (
        <section className="rules-container flex" onClick={clickHandler}>
            <div className="rules grid flow" onClick={(e)=> e.stopPropagation()}>
                <h2 className="rules__title">RULES</h2>
                <button className="rules__close"onClick={clickHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill="#3B4262" fillRule="evenodd" d="M16.97 0l2.122 2.121-7.425 7.425 7.425 7.425-2.121 2.12-7.425-7.424-7.425 7.425L0 16.97l7.425-7.425L0 2.121 2.121 0l7.425 7.425L16.971 0z" opacity=".25"/></svg>
                </button>
                <img src={require(`../assets/${rulesImg}.svg`)} className="rules__illustration" />
            </div>
        </section>
    )
}

export default Rules