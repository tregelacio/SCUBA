import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Loader } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '/imports/api/profile/profile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>SCUBA</Header>
          </Menu.Item>

		  {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/adddive" key='adddive'>
                Create Dive
              </Menu.Item>]
		  ) : ''}
		  
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                    {Roles.userIsInRole(Meteor.userId(), 'admin') ? ''
                        : this.props.profiles.find(element =>
                            element.owner === this.props.currentUser).active === false ?
                            (<Dropdown.Item icon="add user" text="Create Profile" as={NavLink}
                                            exact to={`/createProfile/${this.props.currentUser}`}/>)
                            :
                            (<Dropdown.Item icon="edit" text="Edit Profile" as={NavLink}
                                            exact to={`/edit/${this.props.profiles.find(element =>
                                element.owner === this.props.currentUser)._id}`}/>)}
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  profiles: PropTypes.array,
  ready: PropTypes.bool,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
