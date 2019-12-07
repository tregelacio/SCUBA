import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import AddDive from '../pages/AddDive';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import YourDive from '../pages/YourDive';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
			  <Route path="/adddive" component={AddDive}/>
              <Route path="/signout" component={Signout}/>
			  <Route path="/yourdive" component={YourDive}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}


export default App;
