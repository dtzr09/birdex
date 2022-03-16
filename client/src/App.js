import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Switch, Router, Route } from "react-router-dom";
import  createBrowserHistory from 'history/createBrowserHistory';
import SingleSpeciesPage from './pages/SingleSpeciesPage';
import SingleBird from './pages/SingleBird';
import EntriesPage from './pages/EntriesPage';
import 'semantic-ui-css/semantic.min.css'


const customHistory = createBrowserHistory();

function App() {
  return (
    <Router history={customHistory}>
      <Switch>

        <Route exact path='/'>
          <HomePage/>
        </Route>

        {/* Only when u use this format component={} then the params can be pass down */}
        <Route exact path ='/species/:name' component={SingleSpeciesPage}/>
        
        <Route exact path ='/birds/:speces/:name/:birdsid' component={SingleBird}/>

        <Route exact path = '/birds/:birdName/:birdsid/:species_name/entries' component={EntriesPage}/>
      </Switch>
    </Router>
  );
}

export default App;
