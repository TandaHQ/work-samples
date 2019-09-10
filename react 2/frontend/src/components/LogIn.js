import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseAPI = 'http://localhost:3000'
// const proxyURL = `https://cors-anywhere.herokuapp.com/`

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post(baseAPI + `/auth/login`, {
      email: event.target.email.value,
      password: event.target.password.value
    })
    .then(response => {
      console.log(response)
    })
  }

  render() {
    return(
      <div className="login-container">
        <h2> Log In </h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='email'>
            Email
          </label>
          <br />
          <input type='text' name='email' id='email'></input>
          <br />
          <label htmlFor='password'>
            Password
          </label>
          <br />
          <input type='password' name='password' id='password'></input>
          <br />
          <button type='submit'>Log in</button>
        </form>
        <Link to='/signup'>
          Sign Up
        </Link>
      </div>
    )
  }
}

export default LogIn;
