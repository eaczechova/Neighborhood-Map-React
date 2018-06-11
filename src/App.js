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
  };

  componentDidMount() {
    window.initMap = this.initMap;
    fetch('https://developers.zomato.com/api/v2.1/geocode?lat=52.268833&lon=20.986484', {
      headers: {
        'user-key': '0744018f22b80e8996e37c108b85cc58'
    }})
    .then(response => response.json())
    .then((responseData) => {
          this.setState({ places: responseData });
        })
        .catch(error => this.setState({ error }));

  }

  initMap = () => {
    let map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: 52.268833, lng: 20.986484 }
    });
    this.setState({ map });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="main-content">
          <List places={this.state.places} />
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
