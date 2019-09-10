import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseAPI = `http://localhost:3000`

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return(
      <div className="signup-container">
        <h2> Sign Up </h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>
            Name
          </label>
          <br />
          <input type='text' name='name' id='name'></input>
          <br />
          <label htmlFor='email'>
            Email
          </label>
          <br />
          <input type='text' name='email' id='email'></input>
          <br />
          <label htmlFor='password'>
            Password
            <br />
            <i>(6 characters minimum)</i>
          </label>
          <br />
          <input type='password' name='password' id='password'></input>
          <br />
          <label htmlFor='confirm'>
            Password confirmation
          </label>
          <br />
          <input type='password' name='confirm' id='confirm'></input>
          <br />
          <button type='submit'>Sign Up</button>
        </form>
        <Link to='/'>
          Log In
        </Link>
      </div>
    )
  }
}

export default SignUp;
