import React from 'react'

export default class  GameInfo extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             colorPicker:""
        }
    }
    changedColor=(e)=>{
        this.setState({
            colorPicker:e.target.value
        })
    }
    render(){
        return (
            <div className="start-game-wrapper">
                <label htmlFor="color-picker">{"select your color:".toUpperCase()}</label>
                <input 
                id="color-picker" 
                type="color" 
                className="color-picker"
                onChange={this.changedColor}
                style={{
                    backgroundColor:this.state.colorPicker ? this.state.colorPicker:"black",
                    border:`5px solid ${this.state.colorPicker? this.state.colorPicker:"black"}`
                }}
                />
                <button onClick={()=>{
                    this.props.ss("Game")}}className="start-button">{"Start".toUpperCase()}</button>
            </div>
        )
    }
}

