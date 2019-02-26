import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = props => {
    const controls = Object.keys(props.ingredients).map((ingredient, i) => {
        return <BuildControl 
                    key={i} 
                    add={() => props.add(ingredient)} 
                    remove={() => props.remove(ingredient)} 
                    label={ingredient}
                    disabled={props.disabled[ingredient]}>
                </BuildControl>
    });

    return (
        <div className={classes.BuildControls}>
            {controls}
            <button 
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.ordered}
            >{props.isLoggedIn ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
            </button>
        </div>
    )
}

export default buildControls; 
