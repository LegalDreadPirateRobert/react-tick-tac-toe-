import React from 'react'

export default function GameInfo({user,computer,pause,reset,text,stopGame}) {
    return (
        <div className="game-info-wrapper">
            <h4>Your Score: {user}</h4>
            <h4>Computer Score: {computer}</h4>
            <div className="game-info-button">
                <button onClick={pause}>{!text ? "Pause":"Resume"}</button>
                <button onClick={reset}>Reset</button>
                <button onClick={stopGame}>Stop Game</button>
            </div>
        </div>
    )
}
