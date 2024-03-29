import React from 'react';
import { Dives, DiveSchema } from '/imports/api/dive/dive';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import SubmitField from 'uniforms-semantic/SubmitField';
import SelectField from 'uniforms-semantic/SelectField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import NumField from 'uniforms-semantic/NumField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddDive extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Dive Created' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { diveTime, diveDepth, oxygenPercent, oxygenSize, sac, surfaceTime, createdAt } = data;
    const owner = Meteor.user().username;
    Dives.insert({ owner, createdAt, diveTime, diveDepth, oxygenPercent, oxygenSize, sac, surfaceTime }, this.insertCallback);
}

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
	<div className='dive-create-background'>
        <Grid container centered>
          <Grid.Column>
            <Header as="h1" textAlign="center">Create Dive</Header>
			<Header as="h2" textAlign="center">
			  Input your dive plan data.
			</Header>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={DiveSchema} onSubmit={this.submit}>
              <Segment>
				<NumField label='Dive Depth (meters)' placeholder='0-200' name='diveDepth'/>
				<NumField label='Dive Time (minutes)' placeholder='0-120'name='diveTime'/>
				<NumField label='Oxygen Tank Size (bar)' placeholder='Average is 200 bars' name='oxygenSize'/>
                <NumField label='Current Oxygen Percent' placeholder='0-100' name='oxygenPercent'/>
				<NumField label='SAC (Surface Air Consumption) Rate (bar/minute)' placeholder='Average is 1.5 bar/minute' name='sac'/>
				<NumField label='Planned Surface Time (minutes)' placeholder='Put 0 if not planning to do multiple dives' name='surfaceTime'/>
				<SubmitField value='Create'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
                <HiddenField name='createdAt' value={Date.now()}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
	</div>
    );
  }
}

export default AddDive;

