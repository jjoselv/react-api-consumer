import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {renderHook} from '@testing-library/react-hooks';
import useNationality from './selectors';

describe('features > settings > useNationality', () => {
  /** Create mock store with the count value */
  const mockStore = configureStore([]);
  const state = {
    nationality: 'ch',
  };

  const store = mockStore({
    settings: state,
  });

  it('returns nationality value', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useNationality(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(state.nationality);
  });
});
