import React, {Component} from 'react';
import Map from './Map'
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl, Layer, Feature, Marker } from "react-mapbox-gl";
import Chat from './Chat'

class Otaku extends Component {

  render() {
    return (
      <div>
          <Map />
          <div className="col-2">
          <Chat socket={this.props.socket} />
        </div>
      </div>
    )
  }
}

export default Otaku
