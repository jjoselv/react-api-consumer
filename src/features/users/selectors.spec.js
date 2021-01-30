import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {renderHook} from '@testing-library/react-hooks';
import useUsersAPI from './selectors';

describe('features > users > useUsersAPI', () => {
  /** Create mock store with the count value */
  const mockStore = configureStore([]);
  const state = {
    users: [{a: 3}],
    isLoading: false,
    hasError: false,
    isFulfilled: true,
    page: 32,
  };

  const store = mockStore({
    users: state,
  });

  it('returns users value', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useUsersAPI(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(state);
  });
});
