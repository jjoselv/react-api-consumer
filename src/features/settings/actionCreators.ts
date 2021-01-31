
import {GET_USERS} from '../users/actionTypes';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {SET_NATIONALITY} from './actionTypes';
import {getUsersApi} from '../../core/api/api';

const useActions = () => {
  const dispatch = useDispatch();
  const setNationality = useCallback(
    (nationality: string) => {
      dispatch({
        type: SET_NATIONALITY,
        payload: nationality,
      });
      dispatch({
        type: GET_USERS,
        payload: getUsersApi({
          nat: nationality,
        }, {retry: true}),
      });
    },
    [dispatch]
  );
  return {setNationality};
};

export default useActions;
