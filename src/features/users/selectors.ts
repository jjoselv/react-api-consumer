import {useSelector} from 'react-redux';
import {RootState} from '../../withReduxFeatures';
import {UsersState} from './UsersReducer';

/**
 * Custom React Hook to get randomize.me API response from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useUsersAPI = () => useSelector<RootState, UsersState>(state => state.users);
export const usePage = () => useSelector<RootState, number>(state => state.users.page);
