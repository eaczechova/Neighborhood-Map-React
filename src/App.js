import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import List from "./List";
import Map from "./Map";

class App extends Component {
  state = {
    map: "",
    places: "",
    isLoaded: false,
    markers: [
        { lat: 52.2694760000,
          lng: 20.9853330000,
          name: "Jaskółka",
          address: "Plac Wilsona 4, Żoliborz, Warszawa",
          rating: "4.0",
        },
        { lat: 52.2683910000,
          lng: 20.9806220000,
          name: "Kotłownia",
          address: "Plac Wilsona 4, Żoliborz, Warszawa",
          rating: "4.0",
        },
        { lat: 52.2620550398,
          lng: 20.9807009557,
          name: "Ulica Baśniowa",
          address: "Aleja Wojska Polskiego 41, Żoliborz, Warszawa",
          rating: "4.3",
        },
        { lat: 52.2700630244,
          lng: 20.9822780639,
          name: "Thai Garden",
          address: "",
          rating: "4.0",
        },
        { lat: 52.2667160000,
          lng: 20.9904110000,
          name: "Dom",
          address: "Mierosławskiego 12, Żoliborz, Warszawa",
          rating: "3.8",
        },
        { lat: 52.2657583333,
          lng: 20.9746805556,
          name: "Burgerownia",
          address: "Krasińskiego 24, Żoliborz, Warszawa",
          rating: "3.7",
        },
        { lat: 52.2722055556,
          lng: 20.9737750000,
          name: "Po Byku",
          address: "Gdańska 1, Żoliborz, Warszawa",
          rating: "3.6",
        },
        { lat: 52.2696570000,
          lng: 20.9795390000,
          name: "Secret Life Cafe",
          address: "Słowackiego 15/19, Żoliborz, Warszawa",
          rating: "3.9",
        },
        { lat: 52.2618020000,
          lng: 20.9924350000,
          name: "El Caribe",
          address: "Mickiewicza 9, Żoliborz, Warszawa",
          rating: "3.6",
        },
      ],
      locations: [],
      error: null,
      infoWindow: '',
  };

  /* uses code from  React documentation https://reactjs.org/docs/faq-ajax.html */

  componentDidMount() {
    window.initMap = this.initMap;
    createGoogleMapLink("https://maps.googleapis.com/maps/api/js?key=AIzaSyBzwLWGHmstGUGzSnH9OBOYsB1IqOrgE-M&v=3&callback=initMap")
      fetch("https://developers.zomato.com/api/v2.1/geocode?lat=52.268833&lon=20.986484", {
        headers: {
          "user-key": "0744018f22b80e8996e37c108b85cc58"
      }})
      .then(res => res.json())
      .catch(error => { this.setState({ infoWindow: error });
        alert('Error:', this.state.error)})
      .then(response => {
            this.setState({ places: response, isLoaded: true });
        }
      )
  }

  initMap = () => {
    /* uses code from https://snazzymaps.com/style/151/ultra-light-with-labels website */
    let styles =
    [
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e9e9e9"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            },
            {
              "lightness": 21
            }
          ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dedede"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#333333"
          },
          {
           "lightness": 40
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f2f2f2"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      }
    ];

    let map;
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 52.268833, lng: 20.986484 },
      zoom: 15,
      styles: styles,
    });

    this.setState({ map: map });
    this.createMarkers(map);
  }

  createMarkers = (map) => {
    this.state.markers.map(loc => {
      const latLng = { lat: loc.lat, lng: loc.lng }
      let marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        title: loc.name,
        animation: window.google.maps.Animation.DROP,
        visible: true,
      });

      this.state.locations.push(marker)

      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });

      let infoWindow = new window.google.maps.InfoWindow({
        content: `<h3>${loc.name}</h3>
                  <p>${loc.address}</p>
                  <p>Rating: ${loc.rating}</p>`,
      });
    })

  }

  updateMarkers = (data) => {

    const test = [];
    const location = this.state.locations;
    location.forEach( function(loc) {
      if (loc.title.indexOf(data) >= 0) {
        loc.setVisible(true);
        loc.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {loc.setAnimation(null);}, 1200)
        test.push(loc);
      } else {
        loc.setVisible(false);
      }
    });
    this.setState({ location: test });
  }

  displayModal = (e) => {
    let element = e.target.firstElementChild;
      if (element.style.display === "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
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
            displayModal={this.displayModal}
            updateMarkers={this.updateMarkers}
            error={this.error}
          />
        </div>
      </main>
    );
  }
}

export default App;

function createGoogleMapLink(url) {
    let tag = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.onerror = function () {
        document.write("We are sorry, but Google Maps can't be loaded.");
    };
    tag.parentNode.insertBefore(script, tag);
}
