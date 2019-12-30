import React, { Component } from 'react'
import {checkWinner} from './utils'
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      score: {
        computer: 0,
        You: 0
      },
      boardSpot: [],
      spotToSwitch:-1,
      userCanPlay:true
    }
  }
  componentDidMount = () => {
    this.fillBoard()
  };
  winner =(person)=>{
    console.log("winner")
    this.setState(prevState => {
      return { score:{
        [person]:prevState.score[person]+1
      }};
    });
    this.fillBoard()    
  }
  fillBoard = () => {
    let store = [];
    for (let index = 0; index < 9; index++) {
      store.push(0)
    }
    this.setState({
      boardSpot: store
    })

  }
  resetGame = () => {
    this.setState({
      score: {
        computer: 0,
        You: 0
      }
    })
    this.fillBoard()
  }
  chkBoard =()=>{
    for(let i of this.state.boardSpot){
      if(i === 0){
        return true
      }
    }
    return false
  }
  check=(person)=>{
    let a  = checkWinner(this.state.boardSpot)
        if(a){
          return this.winner(person)
        }
        else{
          let checkB = this.chkBoard()
          if(!checkB){
            return this.fillBoard()
          }
          console.log('here')
          if(person === "You"){
            return  this.computersTurn()
          }
        }
  }
  selectSpot=(index,e)=>{
    if(this.state.userCanPlay){
    let val = e.target.value.toLowerCase()
    if(e.target.value === "x" || e.target.value === "o" ){
      let spot = [...this.state.boardSpot]
      spot[index] = val
      this.setState({
        boardSpot:spot,
        spotToSwitch:-1
      },()=>{
        this.check("You")
      })
    }
  else{
    this.setState({
      spotValue:""
    })
  } 
  }
}
  switchToInput=(index)=>{
    this.setState({
      spotToSwitch:index
    })
  }
  MathRandom = (thing1)=>{
    return thing1[Math.round(Math.random() * thing1.length)]
  }
  computersTurn=()=>{
    let freeSpace = [];
    for (let index = 0; index < this.state.boardSpot.length; index++) {
        if(!this.state.boardSpot[index])freeSpace.push(index)
    }
    let random = this.MathRandom(freeSpace) 
    let choice = ["x","o"];
    let randomChoice = this.MathRandom(choice)
    while(!random && freeSpace.length>1){
      random = this.MathRandom(freeSpace)
    }
    while(!randomChoice){
      randomChoice = this.MathRandom(choice)
    }
    if(!random || !randomChoice){
      return 
    }
    let store = [...this.state.boardSpot];
    store[random]=randomChoice
    this.setState({
      boardSpot:store
    })
    this.check("computer")
  }
  render() {
    return (
      <div>
        <div>
          top
          <div>
            <div>you[]{this.state.score.You}</div>
            <div>computer[]{this.state.score.computer}</div>
          </div>
          <div>
            <button>Start</button>
            <button onClick={this.resetGame}>Reset</button>
          </div>
        </div>
        <div>
          buttom
        <div>
            {this.state.boardSpot.map((item, index) => {
              if(!item){
                  if(this.state.spotToSwitch === index){
                    return <input 
                    type="text" 
                    maxLength={1} 
                    value={this.state.spotValue}
                    onChange={(e)=>{this.selectSpot(index,e)}}
                    />
                  }
                return <div onClick={()=>{this.switchToInput(index)}}>.... {index}</div>
              }
              else{
                return <div>{item} {index}</div>
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}
