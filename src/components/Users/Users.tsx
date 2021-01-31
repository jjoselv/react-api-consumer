import * as React from 'react';
import {useActions} from '../../features/users';
import useUsersAPI from '../../features/users/selectors';
import UserCard from '../UserCard/UserCard';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Modal from '../Modal';
import config from '../../config';
import UserCardBig from '../UserCard/UserCardBig';
import debounce from '../../features/debounce';
import Link from '../Link';
import styles from './Users.module.scss';
import Banner from '../Banner';
import Cog from '../Icons/Cog/Cog';

export type User = {
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  picture: {
    thumbnail: string;
    large: string;
  };
  email: string;
  location: {
    street: {
      number: number | string;
      name: string;
    };
    city: string;
    state: string;
    country: string;    
    postcode: number;
  };
  phone: string;
  cell: string;
};

const generateMatchesIndexArray = (users: User[], searchTerm: string) =>
  users.map((user: User) => {
    const pattern = searchTerm.toLocaleLowerCase();
    const first = `${user?.name?.first ?? ''}`.toLocaleLowerCase();
    const last = `${user?.name?.last ?? ''}`.toLocaleLowerCase();
    // eslint-disable-next-line no-bitwise
    return ~`${first} ${last}`.indexOf(pattern);
  });

const Users = () => {
  const {users, isLoading, isFulfilled, hasError} = useUsersAPI();
  const {getUsers, getNextBatch} = useActions();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>(undefined);
  const [loadMoreRequested, setLoadMoreRequested] = React.useState(false);
  const [searchInputIsFocused, setSearchInputIsFocused] = React.useState(false);
  const [matchesIndexes, setMatchesIndexes] = React.useState([]);

  const searchingModeEnabled = searchInputIsFocused || searchTerm;

  React.useEffect(() => {
    !isFulfilled && getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsers]);

  function handleLoadMore() {
    setLoadMoreRequested(true);
    if (!searchingModeEnabled) {
      getNextBatch();
      setLoadMoreRequested(false);
    }
  }

  function handleSeachInputFocus() {
    setSearchInputIsFocused(true);
  }

  function handleSeachInputBlur() {
    setSearchInputIsFocused(false);
  }

  function handleChangeSearchTerm(e: React.FormEvent<HTMLInputElement>) {
    setSearchTerm((e.target as HTMLInputElement).value);
  }

  const [setMatchesIndexesDebounced, stopExecution] = debounce(
    setMatchesIndexes,
    300
  );

  const hasNextPage = users?.length < config.maxSize;

  const infiniteRef = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: handleLoadMore,
  });

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = (user: User) => () => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  function closeModal() {
    setSelectedUser(undefined);
    setIsOpen(false);
  }

  React.useEffect(() => {
    if (!searchingModeEnabled && loadMoreRequested) {
      getNextBatch();
      setLoadMoreRequested(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchingModeEnabled]);

  React.useEffect(() => {
    if (searchTerm) {
      setMatchesIndexesDebounced(generateMatchesIndexArray(users, searchTerm));
    } else {
      stopExecution();
      setMatchesIndexes([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const showEndOfCatalog =
    !hasNextPage && !isLoading && !hasError && isFulfilled;

  return (
    <div ref={infiniteRef as React.RefObject<HTMLDivElement>}>
      <div className={styles['users-grid-header']}>
        <div className={styles['title-zone']}>
          <h2>Users List</h2>
        </div>
        <div className={styles['search-zone']}>
          <input
            type="search"
            className={styles['search-input']}
            aria-label="search-input"
            value={searchTerm}
            onFocus={handleSeachInputFocus}
            onBlur={handleSeachInputBlur}
            onChange={handleChangeSearchTerm}
            placeholder={`"John Smith"`}
          />
        </div>
        <div className={styles['settings-zone']}>
          <div className={styles['link-container']}>
            <Link to="/settings" aria-label="go to settings">
              <Cog/>
            </Link>
          </div>
        </div>
      </div>
      {searchingModeEnabled && (
        <Banner
          style={{
            position: 'sticky',
            top: '73px',
          }}
          warning
          message="Fetching mechanism paused while searching..."
        />
      )}
      {hasError && (
        <Banner message="Something went wrong, please refresh the page..." />
      )}
      <ul className={styles['users-list']} aria-label="users list">
        {users &&
          users
            .filter((_: any, index: number) =>
              matchesIndexes.length && searchTerm ? matchesIndexes[index] : true
            )
            .map((user: User) => (
              <UserCard
                key={user?.login?.username}
                user={user}
                onClick={openModal(user)}
              />
            ))}
      </ul>
      {isLoading && <Banner showLoading message="Loading..." />}
      {showEndOfCatalog && <Banner message="End of users catalog" />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Information">
        {selectedUser && <UserCardBig user={selectedUser} />}
      </Modal>
    </div>
  );
};

export default Users;
