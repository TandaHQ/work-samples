import React, { Component } from 'react'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      userLoggedIn: false,
      createUser: false
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleCreateUser = this.toggleCreateUser.bind(this)
  }

  handleLoginSubmit(event) {
    event.preventDefault()
    let loginParams = {
      email: this.state.email,
      password: this.state.password
    }
    this.setState({
      email: '',
      password: '',
      userLoggedIn: true
    })
    this.props.handleUserLogin(loginParams)
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  toggleCreateUser() {
    this.setState({
      createUser: true
    })
  }

  render () {
    return (
      <React.Fragment>
      { this.state.createUser === false
        ?
          <div className="log-in">
            <h2>Log in</h2>
            <form onSubmit={this.handleLoginSubmit}>
              <label htmlFor="email">
                Email
              </label>
              <br />
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
                id="email"
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
            <span
              onClick={this.toggleCreateUser}>
              Sign up
            </span>
          </div>
        :
          <div className="create-user">
            <h2>Sign up</h2>
          </div>
      }
      </React.Fragment>
    )
  }
}

export default LogIn;
