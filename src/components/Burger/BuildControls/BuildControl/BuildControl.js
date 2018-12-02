import React from 'react'
import classes from './BuildControl.module.css'

const buildControl = props => {
    const ingredientLabel = props.label.charAt(0).toUpperCase() + props.label.slice(1)

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{ingredientLabel}</div>            
            <button onClick={() => props.remove(props.label)} className={classes.Less}>Less</button>
            <button onClick={() => props.add(props.label)} className={classes.More}>More</button>
        </div>
    )
}

export default buildControl
