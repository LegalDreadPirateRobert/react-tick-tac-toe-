import React from 'react'

export default function GameInfo({is}) {
    console.log(is)
    return (
        <h1 style={{color:!is?"black":"rgb(206, 141, 141)",transition:"color 500ms"}}>{!is?"GAME IN SESSION":"GAME PAUSED"}</h1>
    )
}
