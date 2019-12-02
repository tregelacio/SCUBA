import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Dives } from '../../api/dive/dive.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding Dive For: ${data.owner}`);
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
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Dives', function publish() {
    if (this.userId) {
        const username = Meteor.users.findOne(this.userId).username;
        return Dives.find({ owner: username });
    }
    return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ProfileAdmin', function publish() {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
        return Dives.find();
    }
    return this.ready();
});
//
// /** This subscription publishes all the profiles associated with the profiles db */
// Meteor.publish('Dives', function publish() {
//   return Dives.find();
// });

