import React, { Component } from 'react';

class SignUp extends Component {
  _handleSignup(evt) {
    evt.preventDefault()
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      bio: this.refs.bio.value,
      profilePicture: this.refs.profilePicture.value,
      password: this.refs.password.value,
      address: this.refs.address.value
    }
    this.props.onSignup(newUser)
  }

  render() {
    return (
      <div className='container'>
        <h2>Sign Up</h2>
        <form onSubmit={this._handleSignup.bind(this)}>

          <input type='text' placeholder='Name' ref='name' /><br/>
          <input type='text' placeholder='Email' ref='email' /><br/>
          <input type='text' placeholder='Address' ref='address' /><br/>
          <input type='text' placeholder='Profile picture url...' ref='profilePicture' /><br/>
          <input type='text' placeholder='Short personal description...' ref='bio' /><br/>
          <input type='password' placeholder='Password' ref='password' /><br/>

          <button type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}

export default SignUp
