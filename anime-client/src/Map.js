import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl, Layer, Feature, Marker } from "react-mapbox-gl";
import clientAuth from './clientAuth';

const currentUser = clientAuth.getCurrentUser()
const accessToken = "pk.eyJ1IjoiamVyZW1pYWhoIiwiYSI6ImNqM2t2d3duYTAwc3MycXJ6ZTk3N2ttemEifQ.GRIn6Jx-V76v9R9vPtT-HQ";
const style = "mapbox://styles/mapbox/dark-v9";

const containerStyle = {
  height: "100vh",
  width: "100%"
};

export default class Map extends Component {
  state = {
    popup: null,
    center: [currentUser.lng, currentUser.lat]
  };

  _onClickMarker() {
    console.log("marker clicked!")
  }

  render() {
    return (
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
          layout={{ "icon-image": "marker-15" }}>
          <Feature
            coordinates={[currentUser.lng, currentUser.lat]}
            onHover={this._onHover}
            onEndHover={this._onEndHover}
            onClick={this._onClickMarker}/>
        </Layer>

        {/* <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[currentUser.lng, currentUser.lat]}/>
        </Layer> */}

        {/* <Marker
          onClick={this._markerClick}
          anchor="top"
          onMouseEnter={this._markerMouseEnter}
          onMouseLeave={this._markerMouseLeave}
          className="test"
          coordinates={currentUser.lng, currentUser.lat}>
            <h1>TEST</h1>
        </Marker> */}


      </ReactMapboxGl>
    );
  }
}
