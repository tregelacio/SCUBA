import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import CreateProfile from '../pages/CreateProfile';
import EditProfile from '../pages/EditProfile';
import DeactivateProfile from '../pages/DeactivateProfile';
import AddDive from '../pages/AddDive';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';

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
              <Route path="/createprofile/:_id" component={CreateProfile}/>
              <Route path="/deactivateprofile/:_id" component={DeactivateProfile}/>
              <Route path="/edit/:_id" component={EditProfile}/>
			  <Route path="/adddive" component={AddDive}/>
              <Route path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}


export default App;
