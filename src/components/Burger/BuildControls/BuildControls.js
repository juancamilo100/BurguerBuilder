import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = props => {

    const controls = Object.keys(props.ingredients).map((ingredient, i) => {
        
        return <BuildControl key={i} add={props.add} remove={props.remove} label={ingredient}></BuildControl>
    });

    return (
        <div className={classes.BuildControls}>
            {controls}
        </div>
    )
}

export default buildControls
