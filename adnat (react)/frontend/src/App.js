import React, { Component } from 'react';

import LogIn from './components/LogIn'

const baseAPI = `http://localhost:3000`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      userLoggedIn: false,
      userCreateMessage: '',
      loginError: '',
      loggedInUser: null,
      allOrganisations: []
    }
// BINDING
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleUserLogin = this.handleUserLogin.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.fetchOrganisations = this.fetchOrganisations.bind(this)
    this.sortOrganisations = this.sortOrganisations.bind(this)
  }

// METHODS
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

  handleUserLogin(user) {
    fetch(baseAPI + `/auth/login`, {
      method: 'POST',
      body: JSON.stringify({user: user}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(loginRes => loginRes.json())
      .then(jsonLogin => {
        console.log(jsonLogin)
        if(!jsonLogin.error) {
          localStorage.setItem('sessionId', jsonLogin.sessionId)
          console.log(jsonLogin.sessionId)
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

  handleLogOut(user) {
    fetch(baseAPI + `/auth/logout`, {
      method: 'DELETE',
      body: JSON.stringify({user: user}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('sessionId')
      }
    })
    console.log('User logged out!')
    localStorage.clear()
    this.setState({
      userLoggedIn: false,
      loggedInUser: null,
      currentUser: null
    })
  }

  fetchOrganisations() {
    fetch(baseAPI + `/organisations`)
    .then(data => data.json())
    .then(jsonRes => {
      this.sortOrganisations(jsonRes)
    })
    .catch(err => console.log(err))
  }

  sortOrganisations(organisations) {
    let allOrganisations = []
    organisations.forEach( organisation => {
      if (organisation) {
        allOrganisations.push(organisation)
      }
      this.setState({allOrganisations: allOrganisations})
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
        <LogIn
          userLoggedIn={this.state.userLoggedIn}
          handleUserLogin={this.handleUserLogin}
        />
      </div>
    )
  }
}

// EXPORT
export default App;
