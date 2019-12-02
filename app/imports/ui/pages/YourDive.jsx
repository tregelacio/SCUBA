import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Dives } from '/imports/api/dive/dive';
import Dive from '/imports/ui/components/Dive';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class YourDives extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
/*
        <Container>
          <Header as="h2" textAlign="center" inverted>Your Meetings</Header>
          <Card.Group itemsPerRow={2}>
            {this.props.meetings.map((meeting, index) =>
                <Meeting key={index} meeting={meeting}
                         memberProfiles={
                           this.props.profiles.filter(profile =>
                               _.intersection([profile.owner], meeting.members).length !== 0)}/>)
            }
 */
        <Container>
            <h1 className="ui header">First header</h1>
          <Header as="h2" textAlign="center">Your Dives</Header>

          <Card.Group>
            {this.props.dives.map((dive, index) => <Dive key={index} dive={dive}/>)}
          </Card.Group>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
YourDives.propTypes = {
  dives: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
    /*
    const subscription1 = Meteor.subscribe('Meetings');
    const subscription2 = Meteor.subscribe('Profiles');
     */
  const subscription = Meteor.subscribe('Dives');
  return {
      /*
      meetings: Meetings.find({}).fetch().filter(meeting =>
          _.intersection([Meteor.user().username], meeting.members).length !== 0),
        profiles: Profiles.find({}).fetch(),
        ready: (subscription1.ready() && subscription2.ready()),'
        */
    dives: Dives.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(YourDives);