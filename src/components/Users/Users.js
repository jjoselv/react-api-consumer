import React, {useEffect, useState} from 'react';
import {useActions} from '../../features/users';
import useUsersAPI from '../../features/users/selectors';
import UserCard from '../UserCard/UserCard';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Modal from '../Modal';
import config from '../../config';
import UserCardBig from '../UserCard/UserCardBig';
import debounce from '../../features/debounce';
import {Link} from 'react-router-dom';
import './Users.scss';
import Banner from '../Banner';
import Cog from '../Icons/Cog/Cog';

const generateMatchesIndexArray = (users, searchTerm) =>
  users.map(user => {
    const pattern = searchTerm.toLocaleLowerCase();
    const first = `${user?.name?.first ?? ''}`.toLocaleLowerCase();
    const last = `${user?.name?.last ?? ''}`.toLocaleLowerCase();
    // eslint-disable-next-line no-bitwise
    return ~`${first} ${last}`.indexOf(pattern);
  });

const Users = () => {
  const {users, isLoading, isFulfilled, hasError} = useUsersAPI();
  const {getUsers, getNextBatch} = useActions();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [loadMoreRequested, setLoadMoreRequested] = useState(false);
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);
  const [matchesIndexes, setMatchesIndexes] = useState([]);

  const searchingModeEnabled = searchInputIsFocused || searchTerm;

  useEffect(() => {
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

  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
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

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = user => () => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  function closeModal() {
    setSelectedUser(undefined);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!searchingModeEnabled && loadMoreRequested) {
      getNextBatch();
      setLoadMoreRequested(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchingModeEnabled]);

  useEffect(() => {
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
    <div ref={infiniteRef}>
      <div className="users-grid-header">
        <div className="title-zone">
          <h2>Users List</h2>
        </div>
        <div className="search-zone">
          <input
            type="search"
            className="search-input"
            aria-label="search-input"
            value={searchTerm}
            onFocus={handleSeachInputFocus}
            onBlur={handleSeachInputBlur}
            onChange={handleChangeSearchTerm}
            placeholder={`"John Smith"`}
          />
        </div>
        <div className="settings-zone">
          <div className="link-container">
            <Link to="/settings" className="link" aria-label="go to settings">
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
      <div className="users-grid" role="grid" aria-label="users grid">
        {users &&
          users
            .filter((_, index) =>
              matchesIndexes.length && searchTerm ? matchesIndexes[index] : true
            )
            .map(user => (
              <UserCard
                key={user?.login?.username}
                user={user}
                onClick={openModal(user)}
              />
            ))}
      </div>
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
