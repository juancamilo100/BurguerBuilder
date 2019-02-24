import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = (props) => {
  const authNavItem = props.isLoggedIn ? 
    <NavigationItem link="/logout">Logout</NavigationItem> :
    <NavigationItem link="/login">Sign In</NavigationItem>
  return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact active>Burger Builder</NavigationItem>
        {props.isLoggedIn ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {authNavItem}
    </ul>
  )
}

export default NavigationItems;
