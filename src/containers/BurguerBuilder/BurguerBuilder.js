import React, { Component, Fragment } from 'react'
import moduleName from '../../components/Burguer/Burguer'
import Burguer from '../../components/Burguer/Burguer'

export default class BurguerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },

    }

    render() {
        return (
            <Fragment>
                <Burguer ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Fragment>
        )
    }
}
