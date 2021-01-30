import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NotFound from '../NotFound';
import './App.scss';

function App() {
  return (
    <div className="container">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        
          {/* React Router api dictates using children prop for permanent mount (no remounting no matter the route) */}
          {/* eslint-disable-next-line react/no-children-prop */}
          <Route exact path="/" children={() => <h1>Title</h1>} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
