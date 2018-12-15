import React, { Fragment } from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './SideDrawer.module.css'

const sideDrawer = props => {
    const attachedClasses = [classes.SideDrawer]
    attachedClasses.push(props.open ? classes.Open : classes.Close)

    return (
        <Fragment>
            <div className={classes.Backdrop}>
                <Backdrop                    
                    show={props.open}
                    clicked={props.closed}
                />
            </div>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems />
            </div>
        </Fragment>
    )
}

export default sideDrawer
