import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  componentDidMount() {
    this.props.logOut();
    console.log("Logging out");
    
  }

  render() {
    const content = this.props.isLoggedIn ?
        <Spinner /> :
        <Redirect to='/' />;
    return (
        <div>
            {content}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
