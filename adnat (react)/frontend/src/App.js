import React, { Component } from 'react';

const baseAPI = `http://localhost:3000`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: '',
      userLoggedIn: false
    }
    this.handleCreateUser = this.handleCreateUser.bind(this)
  }

  handleCreateUser(user) {
    console.log(user)
    fetch(baseAPI + `/auth/signup`, {
      body: JSON.stringify({user:user}),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
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

  render() {
    return (
      <div className="app-container">
        <h1> Tanda. </h1>
      </div>
    )
  }
}

export default App;
