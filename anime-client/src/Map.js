import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl } from "react-mapbox-gl";
import clientAuth from './clientAuth';

const currentUser = clientAuth.getCurrentUser()
const accessToken = "pk.eyJ1IjoiamVyZW1pYWhoIiwiYSI6ImNqM2t2d3duYTAwc3MycXJ6ZTk3N2ttemEifQ.GRIn6Jx-V76v9R9vPtT-HQ";
const style = "mapbox://styles/mapbox/streets-v9";

const containerStyle = {
  height: "100vh",
  width: "100%"
};

export default class Map extends Component {
  state = {
    popup: null,
    center: [currentUser.lng, currentUser.lat]
  };

  render() {
    return (
      <ReactMapboxGl
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/dark-v9"
        accessToken={accessToken}
        center={this.state.center}
        movingMethod="jumpTo"
        containerStyle={containerStyle}>

        <ScaleControl/>
        <ZoomControl/>


      </ReactMapboxGl>
    );
  }
}
