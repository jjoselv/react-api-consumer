/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import './UserCardBig.scss';

function UserCardBig({user = {}}) {
  const {
    picture: {large: image} = {},
    name: {first: firstname, last: lastname} = {},
    login: {username} = {},
    email,
    location: {
      street: {number, name} = {},
      city,
      state,
      country,
      postcode,
    } = {},
    phone,
    cell,
  } = user;
  return (
    <div className="big-card-container">
      <div className="profile-picture-container">
        <img src={image} className="profile-picture" alt="profile" />
      </div>
      <div className="data-container">
        <div className="personal-data-contianer">
          <h3>
            <span className="emoji-icon">📖</span>Personal Data:
          </h3>
          <fieldset className="personal-data-fieldset">
            <p className="name">
              {lastname}, {firstname}
            </p>
            <p className="username">{username}</p>
            <p className="email">{email}</p>
          </fieldset>
        </div>
        <div className="location-container">
          <h3>
            <span className="emoji-icon">🌍</span>Location:
          </h3>
          <fieldset className="location-fieldset">
            <p className="location-text">
              {name}
              {number !== undefined && `, ${number}`}
            </p>
            <p className="location-text">
              {city}, {state}, {country}, {postcode}
            </p>
          </fieldset>
        </div>
        <div className="contact-info-container">
          <h3>
            <span className="emoji-icon">📞</span>Contact Info:
          </h3>
          <fieldset className="contact-info-fieldset">
            <p className="phones-text">{phone}</p>
            <p className="phones-text">{cell}</p>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

UserCardBig.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.shape({
      large: PropTypes.string,
    }),
    name: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    login: PropTypes.shape({
      username: PropTypes.string,
    }),
    email: PropTypes.string,
    location: PropTypes.shape({
      street: PropTypes.shape({
        number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
      }),
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
      postcode: PropTypes.number,
    }),
    phone: PropTypes.string,
    cell: PropTypes.string,
  }).isRequired,
};

export default UserCardBig;
