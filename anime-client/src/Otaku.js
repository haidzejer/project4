import React, {Component} from 'react';
import Map from './Map'
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl, Layer, Feature, Marker } from "react-mapbox-gl";
import Chat from './Chat'

class Otaku extends Component {

  render() {
    return (
      <div>
        <Map />
        <Chat socket={this.props.socket} />
      </div>
    )
  }
}

export default Otaku
