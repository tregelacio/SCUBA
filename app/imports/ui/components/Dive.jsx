import React from 'react';
import { Card, Image, Header, Divider, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { _ } from 'meteor/underscore';


class Dive extends React.Component {
  render() {
	
	//Pressure calculated by using density of seawater at 1025 kg/m^3 * depth(m) * gravity(m/s^2) = current pressure in Pascal's.  Convert to atm's and then add +1 atm for for sealevel.
	var pressure = (this.props.dive.diveDepth * 1025 * 9.8)/(101325) +1;
	
	//Formula for oxygen percent found at: https://www.liveabout.com/air-consumption-rates-for-scuba-diving-2962942
	var oxygenRemaining = (this.props.dive.oxygenSize * (this.props.dive.oxygenPercent * .01))/(this.props.dive.sac * pressure);
	var roundedOxygenPercent = oxygenRemaining.toFixed(2);
	
	
	//Dive Table groups found at: https://www.naui.org/resources/dive-tables-review/
	//Also has nitrogen pressure group tables for repetitive diving
	
	//Safety Stops
	var safetyStop = "No Safety Stop Required";
	if(this.props.dive.diveDepth > 100)
		safetyStop = "Safety Stop REQUIRED";
	if((this.props.dive.diveDepth > 50 && this.props.dive.diveTime > 60) ||
	(this.props.dive.diveDepth > 60 && this.props.dive.diveTime > 50) ||
	(this.props.dive.diveDepth > 70 && this.props.dive.diveTime > 35) ||
	(this.props.dive.diveDepth > 80 && this.props.dive.diveTime > 25) ||
	(this.props.dive.diveDepth > 90 && this.props.dive.diveTime > 20))
		safetyStop = "Safety Stop REQUIRED";
		
	//Surface Interval (hard coded dive table lol)
	var nextDiveInfo = " ";
	if(this.props.dive.surfaceTime < 10)
		nextDiveInfo = "You need a minimum surface time of 10 minutes in order to dive again."
	//C
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 100 minutes and up to a max depth of 120 meters for 1 minute.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 120 meters for 5 minutes.";
	if((this.props.dive.diveDepth < 60 && this.props.dive.diveTime < 20 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 120 meters for 5 minutes.";
	if((this.props.dive.diveDepth < 90 && this.props.dive.diveTime < 10 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 120 meters for 5 minutes.";
	if((this.props.dive.diveDepth < 150 && this.props.dive.diveTime < 5 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 120 meters for 5 minutes.";
	//E
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 40 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 80 minutes and up to a max depth of 100 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 40 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 90 minutes and up to a max depth of 110 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 40 && this.props.dive.surfaceTime > 120))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 130 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 60 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 80 minutes and up to a max depth of 100 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 60 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 90 minutes and up to a max depth of 110 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 60 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 120))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 130 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 100 && this.props.dive.diveTime < 20 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 80 minutes and up to a max depth of 100 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 100 && this.props.dive.diveTime < 20 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 90 minutes and up to a max depth of 110 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 100 && this.props.dive.diveTime < 20 && this.props.dive.surfaceTime > 120))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 130 meters for 2 minutes.";
	//G
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 80 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 60 minutes and up to a max depth of 70 meters for 3 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 80 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 80 minutes and up to a max depth of 100 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 80 && this.props.dive.surfaceTime > 300))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 130 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 60 && this.props.dive.diveTime < 45 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 60 minutes and up to a max depth of 70 meters for 3 minutes.";
	if((this.props.dive.diveDepth < 60 && this.props.dive.diveTime < 45 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 80 minutes and up to a max depth of 100 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 60 && this.props.dive.diveTime < 45 && this.props.dive.surfaceTime > 300))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 130 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 90 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 60 minutes and up to a max depth of 70 meters for 3 minutes.";
	if((this.props.dive.diveDepth < 90 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 80 minutes and up to a max depth of 100 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 90 && this.props.dive.diveTime < 30 && this.props.dive.surfaceTime > 300))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 130 meters for 2 minutes.";
	//H
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 80 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 60 minutes and up to a max depth of 70 meters for 3 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 80 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 70 minutes and up to a max depth of 90 meters for 7 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 80 && this.props.dive.surfaceTime > 120))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 90 minutes and up to a max depth of 110 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 80 && this.props.dive.surfaceTime > 300))
		nextDiveInfo = "Using this dive information, you may do another dive between 50 meters for 115 and up to a max depth of 120 meters for 4 minutes.";
	if((this.props.dive.diveDepth < 70 && this.props.dive.diveTime < 40 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 60 minutes and up to a max depth of 70 meters for 3 minutes.";
	if((this.props.dive.diveDepth < 70 && this.props.dive.diveTime < 40 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 70 minutes and up to a max depth of 90 meters for 7 minutes.";
	if((this.props.dive.diveDepth < 70 && this.props.dive.diveTime < 40 && this.props.dive.surfaceTime > 120))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 90 minutes and up to a max depth of 110 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 70 && this.props.dive.diveTime < 40 && this.props.dive.surfaceTime > 300))
		nextDiveInfo = "Using this dive information, you may do another dive between 50 meters for 115 minutes and up to a max depth of 120 meters for 4 minutes.";
	//I
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 100 && this.props.dive.surfaceTime > 10))
		nextDiveInfo = "Using this dive information, you may do another dive up to a max depth of 40 meters for 30 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 100 && this.props.dive.surfaceTime > 60))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 60 minutes and up to a max depth of 70 meters for 3 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 100 && this.props.dive.surfaceTime > 120))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 80 minutes and up to a max depth of 100 meters for 2 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 100 && this.props.dive.surfaceTime > 300))
		nextDiveInfo = "Using this dive information, you may do another dive between 50 meters for 115 and up to a max depth of 120 meters for 4 minutes.";
	if((this.props.dive.diveDepth < 40 && this.props.dive.diveTime < 100 && this.props.dive.surfaceTime > 600))
		nextDiveInfo = "Using this dive information, you may do another dive between 40 meters for 120 minutes and up to a max depth of 130 meters for 2 minutes.";
	
    return (
        <Card centered color='blue'>
          <Card.Content>
            <Card.Header>
				<Header>Dive Time: {this.props.dive.diveTime} minutes  
				Dive Depth: {this.props.dive.diveDepth} meters</Header>
            </Card.Header>
            <Card.Meta>
                Your Dive Information
            </Card.Meta>
            <Card.Description><Icon name="circle"/>
                Oxygen Tank Size: {this.props.dive.oxygenSize} bars
            </Card.Description>
			<Card.Description><Icon name="hourglass half"/>
                Remaining Oxygen Percent: <strong>{roundedOxygenPercent}%</strong>
            </Card.Description>
			<Divider horizontal><Icon name="heartbeat"/>Safety</Divider>
			<Card.Description><Icon name="hand paper"/>
                {safetyStop}
            </Card.Description>
			<Card.Description><Icon name="clock"/>
                Surface Interval Time: {this.props.dive.surfaceTime}
            </Card.Description>
			<Card.Description>
				<i>{nextDiveInfo}</i>
            </Card.Description>
        </Card.Content>

        </Card>
    );
  }
}
          /*
          <Card.Content>
            <Image floated='right' size='mini' src={ownerProfile.picture}/>
            <Card.Header>
              <Header>Created By: {ownerProfile.firstName} {ownerProfile.lastName}</Header>
            </Card.Header>
            <Card.Meta>
              e-mail: {ownerProfile.owner}
            </Card.Meta>
            <Card.Meta>
              Created On: {this.props.dive.createdAt.toDateString()}
            </Card.Meta>
            <Divider horizontal><Icon name="time"/>Time and Place</Divider>
            <Card.Content extra>
              {this.props.meeting.setting} : {this.props.meeting.meetingTime.toDateString()}
            </Card.Content>
            <Divider horizontal><Icon name="users"/>Members</Divider>
            <Card.Content extra>
              {members.map(function (profile, index) {
                return (
                    <div key={index}>
                      <Image src={profile.picture} avatar />
                      <span>{profile.firstName} {profile.lastName}</span>
                    </div>);
              })}
            </Card.Content>
            <Card.Content>
              <Button primary size='mini' fluid as={Link} to={`/addmembers/${this.props.meeting._id}`}>
                Add Members
              </Button>
            </Card.Content>
            <Divider horizontal><Icon name="write square"/>Meeting Notes</Divider>
            <Card.Description>
              {this.props.meeting.minutes}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/editmeeting/${this.props.meeting._id}`}>Edit</Link>
          </Card.Content>
          */


/** Require a document to be passed to this component. */
Dive.propTypes = {
  dive: PropTypes.object.isRequired,
  //memberProfiles: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withRouter(Dive);

