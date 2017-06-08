import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl, Layer, Feature, Marker } from "react-mapbox-gl";
import clientAuth from './clientAuth';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
const currentUser = clientAuth.getCurrentUser();
const accessToken = "pk.eyJ1IjoiamVyZW1pYWhoIiwiYSI6ImNqM2t2d3duYTAwc3MycXJ6ZTk3N2ttemEifQ.GRIn6Jx-V76v9R9vPtT-HQ";
const style = "mapbox://styles/mapbox/dark-v9";

const containerStyle = {
  height: "70vh",
  width: "50%"
};

export default class Map extends Component {
  constructor(){
    super()
    this.state = {
      popup: null,
      center: [currentUser.lng, currentUser.lat],
      nearbyOtakus: [],
      selectedOtaku: {}
    }
  }

  componentDidMount() {
    clientAuth.getUsers().then(res => {
      this.setState({
        nearbyOtakus: res.data
      })
    })
  }

  _onClickMarker(evt) {
    clientAuth.getOtaku(evt.feature.layer.id)
    .then ( res => {
      this.setState({
        selectedOtaku: res.data
      })
    })
  }

  render() {
    const selectedOtaku = this.state.selectedOtaku
    console.log(selectedOtaku);
    const otakus = this.state.nearbyOtakus.map((otaku, i) => {
        if(otaku._id != currentUser._id) {
          return (
            <Layer
              key={i}
              id={otaku._id}
              type="symbol"
              layout={{ "icon-image": "marker-15" }}>
              <Feature
                coordinates={[otaku.lng, otaku.lat]}
                onClick={this._onClickMarker.bind(this)}/>
              </Layer>
            )
        }
    })
    return (
      <div>
      <ReactMapboxGl
        // eslint-disable-next-line
        style={style}
        accessToken={accessToken}
        center={this.state.center}
        movingMethod="jumpTo"
        containerStyle={containerStyle}>

        <ScaleControl/>
        <ZoomControl/>


        <Layer
          type="symbol"
          id={currentUser._id}
          layout={{ "icon-image": "marker-15" }}>
          <Feature
            coordinates={[currentUser.lng, currentUser.lat]}
            onClick={this._onClickMarker.bind(this)}/>
        </Layer>

        {otakus}
      </ReactMapboxGl>

      <div id="selectedOtaku">
        <div id="user-container">
          <img className='picture' src={selectedOtaku.profilePicture || 'https://s-media-cache-ak0.pinimg.com/736x/ae/c4/28/aec42862a67cb9ec42773774197cb8fd.jpg'}/>
          <h1 className='name'>{selectedOtaku.name}</h1>
          <p className='bio'>{selectedOtaku.bio}</p>
        </div>
      </div>

    </div>
    );
  }
}
