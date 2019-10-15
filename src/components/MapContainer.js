import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {GOOGLE_MAP_API_KEY, MAP_STYLES} from '../Constants.js'


export class MapContainer extends Component {
    constructor(props) {
      super(props);
        
      this.state = { markers: []};
       this.setMarkers = this.setMarkers.bind(this)
    }

    setMarkers(arr) { 
        this.setState(state => ({
            markers: arr
        }));
    }

    displayMarkers = () => {
      return this.state.markers.map((marker, index) => {
        return <Marker key={index} id={index} position={{
         lat: marker.latitude,
         lng: marker.longitude
       }}/>
      })
    }
  
    render() {
      return (
          <Map
            google={this.props.google}
            zoom={2}
            style={MAP_STYLES}
            >
            {this.displayMarkers()}
          </Map>
      );
    }
}


export default GoogleApiWrapper({
    apiKey: GOOGLE_MAP_API_KEY
})(MapContainer);
