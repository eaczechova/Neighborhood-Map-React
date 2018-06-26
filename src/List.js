import React, { Component } from 'react';

class List extends Component {

  state = {
    selectedValue: "",
  }

  render() {
    const { displayModal, places, isLoaded, updateMarkers, error } = this.props;

    this.handleChange = (e) => {
      this.setState({ selectedValue: e.target.value });
      this.setState({ selection: true});
      updateMarkers(e.target.value);
    }
    if(error) {
       return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{padding:"15px"}}>Loading...</div>;
    } else {
    return(

      <div className="list" role="complementary">

        <div className="selector">
          <select role="menu"
            onChange={this.handleChange}
            tabIndex="0"
          >
            <option value=""></option>
            {isLoaded ?
              places.nearby_restaurants.map( info => (
                <option value={info.restaurant.name} key={info.restaurant.id }>{info.restaurant.name}</option>
              )) : <option value=""></option>
            }
          </select>
        </div>
        <div className="inner-list">
          {isLoaded ?
            ( this.state.selectedValue === "" ?
              places.nearby_restaurants.map( info => (
              <button className="list-item" tabIndex="0" role="presentation"
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
              <button className="list-item" tabIndex="0" role="presentation"
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
  }}
}

export default List;
