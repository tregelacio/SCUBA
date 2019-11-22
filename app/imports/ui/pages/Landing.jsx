import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='languagepals-landing-background'>
        <Grid container stackable centered columns={1}>

          <Grid.Column textAlign = 'center'>
            <h1 className={'h1'}>Welcome to SCUBA</h1>
            <Header as={'h3'} inverted>
              This is a dive computer to help you plan out scuba dives!
            </Header>
            <Header as={'h3'} inverted>
              WARNING: This is a prototype and should not be used to plan real life dives.
            </Header>
			<img src={'/images/diver.png'} width={'350px'}></img>
          </Grid.Column>

        </Grid>
        </div>
    );
  }
}

export default Landing;
