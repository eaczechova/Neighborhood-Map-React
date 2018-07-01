import React, { Component } from 'react';

class List extends Component {

  state = {
    selectedValue: "",
  }

  //Filter markers based on value slected from the dropdown menu

  updateMarkers = (data) => {
    const selectedLocation = [];
    const location = this.props.locations;
    location.forEach( function(loc) {

      if (loc.title.indexOf(data) >= 0) {
        loc.setVisible(true);
        loc.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {loc.setAnimation(null);}, 1200)
        selectedLocation.push(loc);
      } else {
        loc.setVisible(false);
      }
    });
    this.setState({ location: selectedLocation });
  }

  render() {

    const { locations, isLoaded, openMarker } = this.props;

    //Gets value of selected location and passes it to markers filtering function
    
    this.handleChange = (e) => {
      this.setState({ selectedValue: e.target.value });
      this.updateMarkers(e.target.value);
    }

    return(
      <div className="list" role="complementary">
        <div className="selector">
          <select role="menu"
            onChange={this.handleChange}
            tabIndex="0">
            <option value=""></option>
            {isLoaded ?
              locations.map((info,i) => (
                <option key={i} value={info.title}>{info.title}</option>
            )) : <option value=""></option>}
          </select>
        </div>
        <div className="inner-list">
         {isLoaded ?
           (this.state.selectedValue === "" ?
             locations.map((info,i) => (
             <button key={i} className="list-item" tabIndex="0" role="presentation" onClick={() => openMarker(info)}>
               {info.title}
             </button>)
            ) : locations.filter(info => info.title === this.state.selectedValue).map((info,i) => (
             <button key={i} className="list-item" tabIndex="0" role="presentation" onClick={() => openMarker(info)}>
              {info.title}
            </button>)
           )) : <li></li>
         }
       </div>
      </div>
    )
  }
}

export default List;
