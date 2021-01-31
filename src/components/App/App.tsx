import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Settings from '../Settings';
import Users from '../Users';
import NotFound from '../NotFound';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/settings">
            <Settings />
          </Route>
          {/* React Router api dictates using children prop for permanent mount (no remounting no matter the route) */}
          {/* eslint-disable-next-line react/no-children-prop */}
          <Route exact path="/" children={() => <Users />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
