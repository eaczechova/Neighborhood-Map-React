import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import List from "./List";
import Map from "./Map";

class App extends Component {
  state = {
    markers: require("./originalmarkers.json"), // get all loactions stored in json file
    map: "",
    infoWindow: "",
    locations: [],
    isLoaded: false,
  };

  componentDidMount() {
    window.initMap = this.initMap;
    createGoogleMapLink(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwLWGHmstGUGzSnH9OBOYsB1IqOrgE-M&v=3&callback=initMap"
    );

    fetch("https://developers.zomato.com/api/v2.1/geocode?lat=52.268833&lon=20.986484", {
      headers: {
        "user-key": "0744018f22b80e8996e37c108b85cc58"
    }})
    .then(res => res.json())
    .catch(error => { this.setState({ infoWindow: error });
      alert("Error:", error)})
    .then(response => {
      this.setState({ places: response, isLoaded: true });
    })
  }

  // Initialize map once GoogleMap API is loaded

  initMap = () => {
    let map;
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.268833, lng: 20.986484 },
        zoom: 15,
        styles: require("./styles.json"), //uses style from https://snazzymaps.com/style/151/ultra-light-with-labels website
      });

    let info = new window.google.maps.InfoWindow({});
    this.setState({ map, infoWindow: info });
    this.createMarkers(map);
  }

  // Create markers function invoked once map is initiliazed

  createMarkers = (map) => {
    let self = this;
    this.state.markers.map(marker => {
      const latLng = { lat: marker.lat, lng: marker.lng }
      let flag = new window.google.maps.Marker({
        position: latLng,
        map: map,
        title: marker.name,
        animation: window.google.maps.Animation.DROP,
        visible: true,
      });

      flag.addListener("click", function() {
        self.openMarker(flag);
      });

      let location = this.state.locations;
      location.push(flag);
      this.setState({ locations: location });
    });
  }

  /*
    Function opens marker's infowindow once clicked, uses selected marker's
    latlng information to created api url used to get loaction info;
  */

  openMarker = (marker) => {

    const url = `https://developers.zomato.com/api/v2.1/geocode?lat=${marker.getPosition().lat()}&lon=${marker.getPosition().lng()}`;
    const config = {headers: { "user-key": "0744018f22b80e8996e37c108b85cc58" }};

    if (this.state.infoWindow.marker !== marker) {

      let newInfoWindow = Object.assign(this.state.infoWindow, {}); // auxiliary variable that adds new nested object
      newInfoWindow.marker = marker; // assign key-value pair
      this.setState({infoWindow: newInfoWindow});
      this.state.infoWindow.open(this.state.map, marker);
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => { marker.setAnimation(null) }, 600)
      this.state.infoWindow.addListener("closeClick", function () {
      this.state.infoWindow.setVisible(false);
      });
      this.markerInformation(url, config);
    }
  }

  /*
    Function fetches data from Zomato API based on selected marker title and creates infoWindow content;
    function checks that the fetch was successful https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  */

  markerInformation = (url, config) => {

    let self = this.state.infoWindow;

    self.setContent("Loading...");

    fetch(url, config)
      .then( response => {
        if (response.status !== 200) {
          self.setContent("Sorry, but the data cannot be loaded.");
          return;
        }
        response.json().then( data => {
          const start = data.nearby_restaurants;
          let info = start.filter(info => info.restaurant.name === self.marker.title)
          .map(info => (
          `<h3><b>${info.restaurant.name}</b></h3>
          <p><b>Adderess:</b> ${info.restaurant.location.address}</p>
          <p><b>Cuisines:</b> ${info.restaurant.cuisines}</p>
          <p><b>Raitng:</b> ${info.restaurant.user_rating.aggregate_rating}</p>`
        ));
        const [content] = info;
        self.setContent(content);
      });
    })
    .catch(err => {
      const error = "Data cannot be loaded.";
      self.setContent(error);
    });
  }

  render() {
    return (
      <main>
        <Header />
        <div className="main-content">
          <Map />
          <List
            places={this.state.places}
            isLoaded={this.state.isLoaded}
            openMarker={this.openMarker}
            locations={this.state.locations}
          />
        </div>
      </main>
    );
  }
}

export default App;

// Handles GoogleMap Link in async manner, handles script errors if occures

function createGoogleMapLink(url) {
    let tag = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.onerror = function () {
        document.write("We are sorry, but Google Maps can't be loaded.");
    };
    tag.parentNode.insertBefore(script, tag);
}
