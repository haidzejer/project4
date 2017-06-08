import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg'
import clientAuth from './clientAuth';
import Login from './Login';
import Otaku from './Otaku';
import SignUp from './SignUp';
import Map from './Map';
import HomePartial from './HomePartial';
import FooterPartial from './FooterPartial';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import EditUser from './EditUser';
import bootstrap from 'bootstrap';
// import geolocation from 'node-geolocation';

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
      loggedIn: !!currentUser,
      view: currentUser ? 'otaku' : 'home'
    })
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) => {
      console.log(data)
      this.setState({
        view: 'otaku',
        loggedIn: true,
        currentUser: newUser
      })
    })
  }

  _logIn(credentials) {
    clientAuth.logIn(credentials).then(user => {
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: 'otaku'
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

  _edit(){
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      view: 'otaku'
    })
  }

  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
      view: view
    })
  }

  _deleteUser(evt) {
    evt.preventDefault()
    const id = clientAuth.getCurrentUser()._id
    clientAuth.deleteUser(id).then(res => {
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{this.state.loggedIn ? this.state.currentUser.name : 'Otaku Finder'}</h2>
          <img className='App-logo' src='https://s-media-cache-ak0.pinimg.com/originals/56/ce/8b/56ce8b385ade288bc50bb7a1b50e09d0.png' />
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
          {this.state.loggedIn && (
            <li><button name='edit' onClick={this._setView.bind(this)}>Edit</button></li>
          )}
        </ul>
        {{
          home: <HomePartial />,
          login: <Login onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />,
          edit:
          <div>
            <EditUser onClick={this._edit.bind(this)}/>
            <button className="editUser" onClick={this._deleteUser.bind(this)}>Delete your bitch ass</button>
          </div>,
          otaku: <Otaku />
        }[this.state.view]}

        <FooterPartial />


      </div>
    );
  }
}

export default App;
