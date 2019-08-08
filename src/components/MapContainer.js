import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'

class MapContainer extends Component {

  //NEW STUFF!!!!!!!! 
  state = {
    restaurants: []
    // filteredRestaurants: [],
    // allFilteredRestaurants: [],
  }

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "503SSLTFBQE5VYVQAM1FZSBGHHPG0OFXB1TC5QI5BWS33ZLZ",
      client_secret: "GGHRZNCAO4OTK4IYKFK51YJ4HHVUC3OWJA1Q3W2NJOFZV0K1",
      query: "restaurant",
      near: "Atlanta",
      v: "20182507",
      limit: "5"      
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          restaurants: response.data.response.groups[0].items
          // filteredRestaurants: response.data.response.groups[0].items,
          // allFilteredRestaurants: response.data.response.groups[0].items
        })
        // , this.renderMap()
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
      console.log(this.state.restaurnats);
  }
  
  

  render() {
    console.log (this.state.restaurants);
    //const selectedCastle = this.props.listOfCastles.filter(castle=>this.props.selectedPlace.title === castle.name)[0]
      const selectedRestaurant = this.state.restaurants.filter(restaurant=>this.state.restaurant.venue.name === restaurant.venue.name)[0]

    return (
      <Map
        title="Restaurants near Midtown Atlanta"
        role="application"
        aria-label="Restaurants near Midtown Atlanta"
        google={this.props.google}
        initialCenter={{lat: 33.7758577, lng: -84.398572}}
        zoom={13}
      >

{/* // Create markers from JSON locations */}

      {/* {this.props.listOfCastles.map((index) => { */}
       {this.state.restaurants.map((index) => {
        return (
          <Marker
            tabIndex="0"
            onClick={this.props.onMarkerClick}
            key={index.venue.id}
            // position={index.latlng}
            position={{lat: index.venue.location.lat, lng:index.venue.location.lng}}
            title={index.venue.name}
            //icon={this.props.selectedPlace.title === index.name ? require('../img/pointer-select.png') : require('../img/pointer.png')}
          />
        );
      })
      }



          <InfoWindow
            tabIndex="0"
            onClose={this.onInfoWindowClose}
            style={require('../App.css')}
            marker={this.props.activeMarker}
            visible={this.props.showingInfoWindow}
          >
            {/* {selectedRestaurant ? <div className={"info"}  aria-label="Location information window"> */}
            {selectedRestaurant ? <div className={"info"}  aria-label="Location information window">

              {/* {this.props.fetchedPics[selectedCastle.name]} */}
              <h2 tabIndex="0" className={"info"}>{this.state.venue.name}</h2>
              {/* <a href={selectedCastle.wikiLink} target="_blank">Read Wikipedia Entry</a> */}
              {/* <p tabIndex="0">Flickr owner number: <em>{this.props.flickrOwner[selectedCastle.name]}</em></p> */}

            </div> : <div></div>}
          </InfoWindow>


      </Map>

)}
}


export default GoogleApiWrapper({

  //apiKey: 'AIzaSyB801YN2M2Gi-1YS0BFpSuiMzwgBka2KC4'

})(MapContainer)
