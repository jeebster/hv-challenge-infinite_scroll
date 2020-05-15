import React from 'react';
import PropTypes from 'prop-types';

const HomeListItem = (props) => (
  <div className="home-list-item">
    <img src={props.photoURL} alt={props.address} aria-label="home-list-item-photourl"></img>
    <h2 aria-label="home-list-item-address">Address: {props.address}</h2>
    <h3 aria-label="home-list-item-homeowner">Homeowner: {props.homeowner}</h3>
    <h4 aria-label="home-list-item-price">Price: ${`${new Intl.NumberFormat().format(props.price)}`}</h4>
  </div>
)

HomeListItem.propTypes = {
  id: PropTypes.number,
  address: PropTypes.string,
  homeowner: PropTypes.string,
  price: PropTypes.number,
  photoURL: PropTypes.string,
};

export default HomeListItem;