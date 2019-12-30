import React from 'react'
import ValueContext  from './ValueContext' 
export default class App extends React.Component {
    static contextType = ValueContext
    render(){
        const text= this.context;
        text("what popaing")
        return(
            <div>
                default value from context {text}
            </div>
        )
    }
}