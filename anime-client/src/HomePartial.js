import React, { Component } from 'react';
import map from './map.png';
import './App.css';


export default class HomePartial extends Component {
  render() {
    return (
      <div className="homeView">

        <h1>Find your Anime friends!</h1>

        <img className="homeImg" src="https://myanimelist.cdn-dena.com/s/common/uploaded_files/1467095006-0d7ff572e9f02329eac2537a9f9e0b2c.jpeg"/>

        <div className="feature">
          <h2>Find Nearby Otakus</h2>
          <div className="featureHalf"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>
          <div className="featureHalf"><img src={map}/></div>
        </div>

        <div className="feature">
          <h2>Send a chat request</h2>
          <div className="featureHalf"><img src="http://fdietz.github.io/images/chitchat_components_2.png"/></div>
          <div className="featureHalf"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>
        </div>

      </div>

    )
  }
}
