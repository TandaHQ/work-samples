import React, { Component } from 'react'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      userLoggedIn: false
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleLoginSubmit(event) {
    event.preventDefault()
    let loginParams = {
      email: this.state.email,
      password: this.state.password
    }
    this.setState({
      userLoggedIn: true
    })
    this.props.handleUserLogin(loginParams)
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render () {
    return (
      <React.Fragment>
      { this.props.userLoggedIn === false
        ?
          <div className="log-in">
            <h2>Log in</h2>
            <form onSubmit={this.handleUserLogin}>
              <label htmlFor="email">
                Email
              </label>
              <br />
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
                id="loginEmail"
              />
              <br />
              <label htmlFor="email">
                Password
              </label>
              <br />
              <input
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
                id="password"
              />
              <br />
              <button type="submit"> Log in </button>
            </form>
          </div>
        :
        <span> </span>
      }
      </React.Fragment>
    )
  }
}

export default LogIn;
