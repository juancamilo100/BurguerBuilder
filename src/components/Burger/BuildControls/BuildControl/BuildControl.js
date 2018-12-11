import React from 'react'
import classes from './BuildControl.module.css'

const buildControl = props => {
    const ingredientLabel = props.label.charAt(0).toUpperCase() + props.label.slice(1)

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{ingredientLabel}</div>            
            <button 
                disabled={props.disabled} 
                onClick={props.remove} 
                className={classes.Less}>
                Less
            </button>
            <button 
                onClick={props.add} 
                className={classes.More}
            >More
            </button>
        </div>
    )
}

export default buildControl
