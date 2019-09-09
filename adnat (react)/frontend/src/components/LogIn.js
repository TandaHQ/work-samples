import React, { Component } from 'react'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      userLoggedIn: false
    }
  }

  render () {
    return (
      <React.Fragment>
      { this.props.userLoggedIn === false
        ?
          <div className="log-in">
            <h2>Log in</h2>
          </div>
        :
        <span> </span>
      }
      </React.Fragment>
    )
  }
}

export default LogIn;
