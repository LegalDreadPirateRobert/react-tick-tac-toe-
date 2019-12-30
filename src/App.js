import React from 'react'
import Field from "./Field"
import StartGame from './StartGame'
import Game from './Game'
//import "./styles.scss"
import ValueContext  from './ValueContext' 

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            screen:"Start-screen"
        }
        this.ref = React.createRef();
    }
    setScreen=(s)=>{
        this.setState({
            screen:s
        })
    }
    doSomething=(argument)=>{
        alert(argument)
        console.log(argument)
    }
    render(){
        return(
            <div>
                <ValueContext.Provider value={this.doSomething}>
                    <Field  />
                </ValueContext.Provider>
                {/* {(
                    <React.Fragment>
                        <button>what popaing</button>
                        <button>what popaing 2</button>
                    </React.Fragment>
                )}
                <button ref={this.ref}> hello what popaing</button>
                {this.state.screen === "Start-screen" && (<StartGame ss={this.setScreen}/>)}
                {this.state.screen === "Game" && (<Game ss={this.setScreen}/>)} */}
            </div>
        )
    }
}