import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from '../../config';
import {GET_USERS} from '../users/actionTypes';
import {buildUsersParams} from '../users/utils';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {SET_NATIONALITY} from './actionTypes';

axiosRetry(axios, {retries: 3});

const useActions = () => {
  const dispatch = useDispatch();
  const setNationality = useCallback(
    nationality => {
      dispatch({
        type: SET_NATIONALITY,
        payload: nationality,
      });
      dispatch({
        type: GET_USERS,
        payload: axios.get(config.randomUserAPI, {
          params: buildUsersParams(config.randomUserAPI, {
            nat: nationality,
          }),
        }),
      });
    },
    [dispatch]
  );
  return {setNationality};
};

export default useActions;
