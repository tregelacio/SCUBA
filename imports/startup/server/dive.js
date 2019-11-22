import { Meteor } from 'meteor/meteor';
import { Dives } from '../../api/dive/dive.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding Meeting For: ${data.owner}`);
  Dives.insert(data);
}

/** Initialize the collection if empty. */
if (Dives.find().count() === 0) {
  if (Meteor.settings.defaultDives) {
    console.log('Creating default dives.');
    Meteor.settings.defaultDives.map(data => addData(data));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
} else {
  console.log('Cannot initialize the database! Dives.find().count() != 0 ');
}

/** This subscription publishes all the profiles associated with the profiles db */
Meteor.publish('Dives', function publish() {
  return Dives.find();
});

