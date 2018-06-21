import React, { Component } from 'react';

class List extends Component {

  state = {
    selectedValue: "",
  }

  render() {
    const { displayModal, places, loading, value, filterMarkers } = this.props;

    // this.keyboardHandler = (event) => {
    //   if((event.keyCode == 13) || (event.keyCode== 32)) {
    //   displayModal;
    //   }
    // }

    this.handleChange = (e) => {
      this.setState({ selectedValue: e.target.value });
      this.setState({ value: e.target.value });
      filterMarkers();
      console.log("value:", value);
    }

    return(
      <div className="list" role="complementary">
        <div className="selector">
          <select role="menu"
            onChange={this.handleChange}
            tabindex="0"
          >
            <option value=""></option>
            {loading === false ?
              places.nearby_restaurants.map( info => (
                <option value={info.restaurant.name} key={info.restaurant.id }>{info.restaurant.name}</option>
              )) : <option value=""></option>
            }
          </select>
        </div>
        <div className="inner-list">
          {loading === false ?
            ( this.state.selectedValue === "" ?
              places.nearby_restaurants.map( info => (
              <button className="list-item" tabindex="0" role="presentation"
                key={ info.restaurant.id }
                onClick={displayModal}
              >
                {info.restaurant.name}
                <div style={{display:"none"}} id="myModal" >
                  <img className="restaurant-img" src={info.restaurant.featured_image} alt="restaurant cuisine"/>
                  <p className="restaurant-address"><strong>Address:</strong> {info.restaurant.location.address}</p>
                  <p className="restaurant-cuisines"><strong>Cuisines:</strong> {info.restaurant.cuisines}</p>
                  <p className="restaurant-rating"><strong>Rating:</strong> {info.restaurant.user_rating.aggregate_rating}</p>
                </div>
              </button> )
              ) : places.nearby_restaurants.filter(info => info.restaurant.name === this.state.selectedValue).map( info => (
              <button className="list-item" tabindex="0" role="presentation"
                key={info.restaurant.id}
                onClick={displayModal}
              >
                {info.restaurant.name}
                <div style={{display:"none"}} id="myModal">
                  <img className="restaurant-img" src={info.restaurant.featured_image} alt="restaurant cuisine"/>
                  <p className="restaurant-address"><strong>Address:</strong> {info.restaurant.location.address}</p>
                  <p className="restaurant-cuisines"><strong>Cuisines:</strong> {info.restaurant.cuisines}</p>
                  <p className="restaurant-rating"><strong>Rating:</strong> {info.restaurant.user_rating.aggregate_rating}</p>
                </div>
              </button>)
            )) : <li></li>
          }
        </div>
      </div>
    )
  }
}

export default List;
