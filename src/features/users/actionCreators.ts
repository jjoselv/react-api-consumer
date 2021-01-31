import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {getUsersApi} from '../../core/api/api';
import {useNationality} from '../settings';
import {GET_NEXT_BATCH, GET_USERS} from './actionTypes';
import {usePage} from './selectors';

const useActions = () => {
  const dispatch = useDispatch();
  const nationality = useNationality();
  const page = usePage();
  const getUsers = useCallback(
    () =>
      dispatch({
        type: GET_USERS,
        payload: getUsersApi({
          nat: nationality,
        }, {retry: true})
      }),
    [dispatch, nationality]
  );
  const getNextBatch = useCallback(
    () =>
      dispatch({
        type: GET_NEXT_BATCH,
        payload:  getUsersApi({
          page: page + 1,
          nat: nationality,
        }, {retry: true})
      }),
    [dispatch, page, nationality]
  );
  return {getUsers, getNextBatch};
};

export default useActions;
