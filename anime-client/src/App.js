import React, { Component } from 'react';
import './App.css';
import clientAuth from './clientAuth';
import Login from './Login';
import SignUp from './SignUp';

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
      view: 'home'
    }
  }

  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser
    })
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) => {
      console.log(data)
      this.setState({
        view: 'login'
      })
    })
  }

  _logIn(credentials) {
    clientAuth.logIn(credentials).then(user => {
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: 'home'
      })
    })
  }

  _logOut() {
    clientAuth.logOut().then(message => {
      console.log(message)
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }

  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
      view: view
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{this.state.loggedIn ? this.state.currentUser.name : 'Not Logged In'}</h2>
        </div>
        <ul>
          {!this.state.loggedIn && (
            <li><button name='signup' onClick={this._setView.bind(this)}>Sign Up</button></li>
          )}

          {!this.state.loggedIn && (
            <li><button name='login' onClick={this._setView.bind(this)}>Log In</button></li>
          )}
          {this.state.loggedIn && (
            <li><button onClick={this._logOut.bind(this)}>Log Out</button></li>
          )}
        </ul>
        {{
          home: <h1>The Home View</h1>,
          login: <Login onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />
          // otaku: <Otaku />
        }[this.state.view]}
      </div>
    );
  }
}

export default App;
