import React from 'react'
import GameInfo from './GameInfo'
import GameStatus from "./GameStatus"
// import StartGame from "./StartGame"
import {checkWinner} from './utils'
export default class App extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userInput:"",
             spot:[
                 0,0,0,
                 0,0,0,
                 0,0,0],
             counter:0,
             userSpecifiedColor:"green",
             computerColor:"blue",
             player:"me",
             userScore:0,
             computerScore:0,
             input_state:false,
             last_play:0,
             screen:"Start-Screen"
        }
        this.index = -1
    }
    increaseScore=(person)=>{
        this.setState((state, props) => { 
            return {
                [person]:state[person]+1
              }})
    }
    userInput=(index,e)=>{
        let i = e.target.value
        if(!this.state.spot[index]){
            if(i.toLowerCase() === "x" || i.toLowerCase() === "o"){
                let spot = [...this.state.spot]
                spot[index] = i.toLowerCase()
                this.setState({
                    spot,
                    player:"me",
                    last_play:index
                },()=>{
                    let winner = checkWinner(this.state.spot,"you")
                    if(winner){
                        this.newGame()
                        this.increaseScore("userScore")
                    }
                    else{
                        let board = this.checkBoard()        
                        if(board){
                            this.newGame()
                        }
                        else{
                            this.computer()
                        }
                    }
                })

            }
        }
    }
    newGame=()=>{
        this.setState({
            spot:[0,0,0,0,0,0,0,0,0],
            player:"me",
            userScore:0,
            computerScore:0,
            input_state:false,
        })
    }
    checkBoard=()=>{
        for (const key of this.state.spot) {
            if(!key)return false
        }
        return true
    }
    computer=()=>{
        let free_spot = []
        let play = ["x","o"][Math.round(Math.random() *2)]
        let spot = undefined
        for(let i  in this.state.spot){
            if(!this.state.spot[i]){
                free_spot.push(Number(i))
            }
        }
        if(free_spot.length === 1){
            spot = 0 
        }
        else{
            spot = Math.round(Math.random() *free_spot.length)
        }
        if(!play)play = "x"
        if(!free_spot[spot]){
            free_spot[spot] = free_spot[0]
        }
        let index = [...this.state.spot]
        index[free_spot[spot]] = play
        this.setState({
            spot:index,
            player:"computer"
        })
        let winner = checkWinner(this.state.spot)
        console.log(winner,"cp")
        if(winner){
            this.newGame()
            this.increaseScore("computerScore")
        }
        // else{
        //     let board = this.checkBoard()        
        //     if(board){
        //         this.newGame()
        //     }
        //     else{
        //         this.computer()
        //     }
        // }
    }
    pause_game=()=>{
        this.setState((state, props) => { 
            return { 
                input_state:!state.input_state
             }})
        
    }
    stopGame=()=>{
        this.props.ss("Start-screen")
    }
    render(){
    return (
        <div className="container-wrapper">
            {/* <StartGame /> */}
            <GameStatus is={this.state.input_state}/>
            <div className="game-container">
                {
                    ["layer","layer","layer"].map((item,index)=>{
                        return <div className={item} key={index}>
                            {
                                ["spot","spot","spot"].map((item,index)=>{
                                    this.index = this.index+1
                                    if(this.index > 8){
                                        this.index = 0
                                    }
                                    let counter = this.index
                                    let fillColor = this.state.player === "me"? this.state.userSpecifiedColor:this.state.computerColor
                                    return <div key={index} className="spot">
                                        {
                                            this.state.spot[counter] === 0 && (
                                                <input 
                                                className="input-field" 
                                                value={this.state.userInput}
                                                disabled={this.state.input_state}
                                                onChange={(e)=>{
                                                    this.userInput(counter,e)
                                                }}
                                                type="text"
                                                />
                                            )
                                        }
                                        {
                                            this.state.spot[counter] === "x" && (
                                                 <svg  className="svg-x-icon" xmlns="http://www.w3.org/2000/svg" width="126.554" height="127.044" viewBox="0 0 126.554 127.044" color="yellow">
                                            <path id="Union_1" fill={fillColor} data-name="Union 1" d="M14.819,91.7,35.063,56.4,0,36.017l12.1-21.1L47.163,35.3,67.406,0,88.364,12.182,68.12,47.48l35.064,20.38-12.1,21.1L56.021,68.579l-20.244,35.3Z" transform="matrix(0.966, 0.259, -0.259, 0.966, 26.886, 0)"/>
                                                </svg>
                                            )
                                        }
                                        {
                                            this.state.spot[counter] === "o" && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="svg-x-icon" width="110.196" height="110.196" viewBox="0 0 110.196 110.196">
                                            <path id="Path_10" data-name="Path 10" d="M55.1,0A55.1,55.1,0,1,1,0,55.1,55.1,55.1,0,0,1,55.1,0Z" transform="translate(0 0)" fill={fillColor}/>
                                                </svg>
                                            )
                                        }
                                          </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
            <GameInfo 
            user={this.state.userScore} 
            computer={this.state.computerScore} 
            pause={this.pause_game}
            text={this.state.input_state}
            reset={this.newGame}
            stopGame={this.stopGame}
            />
        </div>
      )
  }
}



