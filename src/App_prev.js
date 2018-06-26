import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import List from './List';
import Map from './Map';

class App extends Component {
  state = {
    map: '',
    info: '',
    places: '',
    loading: true,
    flag: false,
    selection: false,
    markers: [
        { lat: 52.2694760000,
          lng: 20.9853330000,
          name: "Jaskółka",
        },
        { lat: 52.2683910000,
          lng: 20.9806220000,
          name: "Kotłownia",
        },
        { lat: 52.2620550398,
          lng: 20.9807009557,
          name: "Ulica Baśniowa",
        },
        { lat: 52.2700630244,
          lng: 20.9822780639,
          name: "Thai Garden",
        },
        { lat: 52.2667160000,
          lng: 20.9904110000,
          name: "Dom",
        },
        { lat: 52.2657583333,
          lng: 20.9746805556,
          name: "Burgerownia",
        },
        { lat: 52.2722055556,
          lng: 20.9737750000,
          name: "Po Byku",
        },
        { lat: 52.2696570000,
          lng: 20.9795390000,
          name: "Secret Life Cafe",
        },
        { lat: 52.2618020000,
          lng: 20.9924350000,
          name: "El Caribe",
        },
      ],

      selectedLocation: [
        { lat: 52.2694760000,
          lng: 20.9853330000,
          name: "Jaskółka",
        },
    ],
  };

  componentDidMount() {
    window.initMap = this.initMap;
      fetch('https://developers.zomato.com/api/v2.1/geocode?lat=52.268833&lon=20.986484', {
        headers: {
          'user-key': '0744018f22b80e8996e37c108b85cc58'
      }})
      .then(response => response.json())
      .then(responseData => {
            this.setState({ places: responseData, loading: false });
            this.storeData();
        })
      .catch(error => this.setState({ error }));
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
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 52.268833, lng: 20.986484 },
      zoom: 15,
      styles: styles,
    });
    this.setState({ map });

    this.state.markers.map( loc => {
      const latLng = { lat: loc.lat, lng: loc.lng }
        let marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        title: loc.name,
        animation: window.google.maps.Animation.DROP,
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });

      let infoWindow = new window.google.maps.InfoWindow({
        content: '<strong>'+loc.name+'</strong>',
      });

    })
      // this.state.selectedLocation.map( loc => {
      //   const latLng = { lat: loc.lat, lng: loc.lng }
      //     let marker = new window.google.maps.Marker({
      //     position: latLng,
      //     map: map,
      //     title: loc.name,
      //     animation: window.google.maps.Animation.DROP,
      //   });
      //
      //   marker.addListener('click', function() {
      //     infoWindow.open(map, marker);
      //   });
      //
      //   let infoWindow = new window.google.maps.InfoWindow({
      //     content: '<strong>'+loc.name+'</strong>',
      //   });
      //
      // })
   }

   filterMarkers = (data) => {
     let originalMarkersList = this.state.markers;
     console.log("Original markers array:", this.state.markers);
     console.log("Data selected from the dropdown menu:", data);
     console.log("Original selectedLocation array:", this.state.selectedLocation);
     let test = this.state.markers.filter( marker => marker.name === data);
     console.log("Filtered markers array", test);
     this.setState({ selectedLocation: test });
     console.log("After setState on selectedLocation:", this.state.selectedLocation); }


  displayModal = (e) => {
    let element = e.target.firstElementChild;
      if (element.style.display === 'none') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
  }

  render() {
    return (
      <main>
        <Header />
        <div className="main-content">
          <List
            places={this.state.places}
            loading={this.state.loading}
            displayModal={this.displayModal}
            handleChange={this.handleChange}
            value={this.value}
            selection={this.selection}
            filterMarkers={this.filterMarkers}
            selectedMarker={this.selectedMarker}
          />
          <Map />
        </div>
      </main>
    );
  }
}

export default App;
