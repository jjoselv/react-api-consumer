import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {useNationality} from '../settings';
import config from '../../config';
import {GET_NEXT_BATCH, GET_USERS} from './actionTypes';
import {buildUsersParams} from './utils';

axiosRetry(axios, {retries: 3});

const useActions = () => {
  const dispatch = useDispatch();
  const nationality = useNationality();
  const page = useSelector(state => state.users.page);
  const getUsers = useCallback(
    () =>
      dispatch({
        type: GET_USERS,
        payload: axios.get(config.randomUserAPI, {
          params: buildUsersParams(config.randomUserAPI, {
            nat: nationality,
          }),
        }),
      }),
    [dispatch, nationality]
  );
  const getNextBatch = useCallback(
    () =>
      dispatch({
        type: GET_NEXT_BATCH,
        payload: axios.get(config.randomUserAPI, {
          params: buildUsersParams(config.randomUserAPI, {
            page: page + 1,
            nat: nationality,
          }),
        }),
      }),
    [dispatch, page, nationality]
  );
  return {getUsers, getNextBatch};
};

export default useActions;
