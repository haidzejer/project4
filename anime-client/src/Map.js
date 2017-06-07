import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl, Layer, Feature, Marker } from "react-mapbox-gl";
import clientAuth from './clientAuth';
import jwt_decode from 'jwt-decode'
const currentUser = clientAuth.getCurrentUser()
const accessToken = "pk.eyJ1IjoiamVyZW1pYWhoIiwiYSI6ImNqM2t2d3duYTAwc3MycXJ6ZTk3N2ttemEifQ.GRIn6Jx-V76v9R9vPtT-HQ";
const style = "mapbox://styles/mapbox/dark-v9";

const containerStyle = {
  height: "70vh",
  width: "50%"
};

export default class Map extends Component {
  state = {
    popup: null,
    center: [currentUser.lng, currentUser.lat],
    nearbyOtakus: []
  };

  componentDidMount() {
    clientAuth.getUsers().then(res => (
      this.setState({
        nearbyOtakus: res.data
      })
    ))
  }

  _onClickMarker() {
    console.log("marker clicked!")
  }

  render() {
    const otakus = this.state.nearbyOtakus.map((otaku, i) => {
      return (
        <Layer
          key={i}
          type="symbol"
          layout={{ "icon-image": "marker-15" }}>
          <Feature
            coordinates={[otaku.lng, otaku.lat]}
            onHover={this._onHover}
            onEndHover={this._onEndHover}
            onClick={this._onClickMarker}/>
        </Layer>
      )
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
          layout={{ "icon-image": "marker-15" }}>
          <Feature
            coordinates={[currentUser.lng, currentUser.lat]}
            onHover={this._onHover}
            onEndHover={this._onEndHover}
            onClick={this._onClickMarker}/>
        </Layer>

        {otakus}

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
    </div>
    );
  }
}
