/* eslint-disable jsx-a11y/accessible-emoji */
import styles from './UserCardBig.module.scss';
import type { User } from '../Users/Users';

type UserCardBigProps = {
  user: User;
};

function UserCardBig({
  user
}: UserCardBigProps) {
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
    <div className={styles['big-card-container']}>
      <div className={styles['profile-picture-container']}>
        <img src={image} className={styles['profile-picture']} alt="profile" />
      </div>
      <div className={styles['data-container']}>
        <div className={styles['personal-data-contianer']}>
          <h3>
            <span className={styles['emoji-icon']}>📖</span>Personal Data:
          </h3>
          <fieldset className={styles['personal-data-fieldset']}>
            <p className={styles['name']}>
              {lastname}, {firstname}
            </p>
            <p className={styles['username']}>{username}</p>
            <p className={styles['email']}>{email}</p>
          </fieldset>
        </div>
        <div className={styles['location-container']}>
          <h3>
            <span className={styles['emoji-icon']}>🌍</span>Location:
          </h3>
          <fieldset className={styles['location-fieldset']}>
            <p className={styles['location-text']}>
              {name}
              {number !== undefined && `, ${number}`}
            </p>
            <p className={styles['location-text']}>
              {city}, {state}, {country}, {postcode}
            </p>
          </fieldset>
        </div>
        <div className={styles['contact-info-container']}>
          <h3>
            <span className={styles['emoji-icon']}>📞</span>Contact Info:
          </h3>
          <fieldset className={styles['contact-info-fieldset']}>
            <p className={styles['phones-text']}>{phone}</p>
            <p className={styles['phones-text']}>{cell}</p>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default UserCardBig;
