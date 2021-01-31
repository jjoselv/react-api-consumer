/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
import * as React from 'react';
import { StoreType, ProviderType } from './withReduxFeatures';

const withProvider = ({store, Provider}: {store: StoreType, Provider: ProviderType}) => (WrappedComponent: React.ElementType) => (props: any) => (
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
);

export default withProvider;
