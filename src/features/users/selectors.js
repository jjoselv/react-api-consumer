import {useSelector} from 'react-redux';

/**
 * Custom React Hook to get randomize.me API response from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
const useUsersAPI = () => useSelector(state => state.users);

export default useUsersAPI;
