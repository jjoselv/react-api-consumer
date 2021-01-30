/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import './UserCard.scss';

function UserCard({user = {}, onClick}) {
  function handleBtnKeyDown(event) {
    // Check to see if space or enter were pressed
    if (
      event.key === ' ' ||
      event.key === 'Enter' ||
      event.key === 'Spacebar'
    ) {
      // "Spacebar" for IE11 support
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onClick();
    }
  }
  function handleBtnClick() {
    onClick();
  }
  const {
    picture: {thumbnail} = {},
    name: {first: firstname, last: lastname} = {},
    login: {username} = {},
    email,
  } = user;
  return (
    <div
      className="small-card-container"
      onClick={handleBtnClick}
      tabIndex={0}
      onKeyPress={handleBtnKeyDown}
      data-testid="user-card"
      role="button">
      <div className="profile-picture-container">
        <img src={thumbnail} className="profile-picture" alt="profile" />
      </div>
      <div className="contact-info">
        <p className="name">
          {lastname}, {firstname}
        </p>
        <p className="username">{username}</p>
        <p className="email">
          <span className="email-icon">📧</span>
          {email}
        </p>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    name: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    login: PropTypes.shape({
      username: PropTypes.string,
    }),
    email: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserCard;
