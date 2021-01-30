import React from 'react';
import ReactDOM from 'react-dom';
import withReduxFeatures from './withReduxFeatures';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

/** Wrap App component with store providers */
const WrappedApp = withReduxFeatures(App);

ReactDOM.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
