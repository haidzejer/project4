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
        <nav id="sidebar">
          <div className="navagation">
            <div className="link-container">
              <a href="#"><i><img className="icon" name="home" onClick={this._setView.bind(this)} src="http://publish.uwo.ca/~rforbes8/Manga-advisor/images/homeicon.png"/><div translate><span>Home</span></div></i></a>
            </div><br/>

            {!this.state.loggedIn && (
              <div className="link-container">
                <a href="#"><i><img className="icon" name='login' onClick={this._setView.bind(this)} src="https://cdn4.iconfinder.com/data/icons/security-soft-1/512/lock_security_business_web_data_information_system-512.png"/><div translate><span>Login</span></div></i></a>
              </div>
            ) ||
            this.state.loggedIn && (
              <div className="link-container">
                <a href="#" onClick={this._logOut.bind(this)}><i><img className="icon" src="https://cdn4.iconfinder.com/data/icons/proglyphs-computers-and-development/512/Logout-512.png"/><div translate><span>Logout</span></div></i></a>
              </div>
            )}<br/>

            {!this.state.loggedIn && (
              <div className="link-container">
                <a href="#"><i><img className="icon" name='signup' onClick={this._setView.bind(this)} src="http://cvcs.education/wp-content/uploads/2016/06/edit-icon.png"/><div translate><span>Signup</span></div></i></a>
              </div>
            ) ||
            this.state.loggedIn && (
              <div className="link-container">
                <a href="#"><i><img className="icon" name='edit' onClick={this._setView.bind(this)} src="http://icons.iconarchive.com/icons/icons8/windows-8/512/Programming-Edit-Property-icon.png"/><div translate><span>Edit</span></div></i></a>
              </div>
            )}<br/>

            { this.state.loggedIn && (
              <div className="link-container">
              <a href="#"><i><img className="icon" name='otaku' onClick={this._setView.bind(this)} src="http://orig14.deviantart.net/092a/f/2017/119/d/2/batcho9_by_reddomi-db7ii59.png"/><div translate><span>Otaku</span></div></i></a>
            </div>
            )}

          </div>
        </nav>
        <div className="App-header">
          <div className="headerContent">
            <h1>Otaku Finder</h1>
            <h2>Find your Anime friends!</h2>
          </div>
        </div>
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
