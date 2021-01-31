/* eslint-disable jsx-a11y/accessible-emoji */
import styles from './UserCard.module.scss';
import type {User} from '../Users/Users';

type UserCardProps = {
  user: User;
  onClick(event?: React.MouseEvent<HTMLDivElement>): void;
};

function UserCard({
  user,
  onClick
}: UserCardProps) {
  function handleBtnKeyDown(event: React.KeyboardEvent) {
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
    <li
      className={styles['small-card-container']}
      onClick={handleBtnClick}
      tabIndex={0}
      onKeyPress={handleBtnKeyDown}
      data-testid="user-card"
      role="button"
    >
      <div className={styles['profile-picture-container']}>
        <img src={thumbnail} alt='user' className={styles['profile-picture']} />
      </div>
      <div className={styles['contact-info']}>
        <p className={styles['name']}>
          {lastname}, {firstname}
        </p>
        <p className={styles['username']}>{username}</p>
        <p className={styles['email']}>
          <span className={styles['email-icon']}>📧</span>
          {email}
        </p>
      </div>
    </li>
  );
}

export default UserCard;
