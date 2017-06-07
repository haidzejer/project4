import React, {Component} from 'react';
import Map from './Map'
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl, Layer, Feature, Marker } from "react-mapbox-gl";

class Otaku extends Component {

  render() {
    return (
      <Map />
    )
  }
}

export default Otaku
