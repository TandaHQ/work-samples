import React, { Component } from 'react';

const baseAPI = `http://localhost:3000`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: '',
      userLoggedIn: false
    }
// BINDING
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleUserLogin = this.handleUserLogin.bind(this)
  }

// METHODS

  handleCreateUser(user) {
    console.log(user)
    fetch(baseAPI + `/auth/signup`, {
      body: JSON.stringify({user:user}),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Authorization": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        'Content-Type': 'application/json'
      }
    })
    .then(createdUser => createdUser.json())
    .then(userJson => {
      console.log(userJson)
      this.setState({
        userCreateMessage: 'User created successfully! Please Log-In to continue!',
        loginError: ''
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        userCreateMessage: 'Error! User not created.',
        loginError: ''
      })
    })
  }

  handleUserLogin(user) {
    fetch(baseAPI + `/auth/login`, {
      method: 'POST',
      body: JSON.stringify({user: user}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Authorization": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        'Content-Type': 'application/json'
      }
    })
      .then(loginRes => loginRes.json())
      .then(jsonLogin => {
        console.log(jsonLogin)
        if(!jsonLogin.error) {
          this.setState({
            loggedInUser: jsonLogin.user.name,
            userCreateMessage: '',
            loginError: '',
            userLoggedIn: true,
            currentUser: jsonLogin.user
          })
        }
        else {
          console.log(jsonLogin.error)
          this.setState({
            loginError: jsonLogin.error,
            userCreateMessage: '',
            userLoggedIn: false
          })
        }
      })
  }

// DIDMOUNT
  componentDidMount() {

  }

// RENDER

  render() {
    return (
      <div className="app-container">
        <h1> Tanda. </h1>
      </div>
    )
  }
}

// EXPORT
export default App;
