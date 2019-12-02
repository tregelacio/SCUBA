import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Dives = new Mongo.Collection('Dives');

/** Create a schema to constrain the structure of documents associated with this collection. */
const DiveSchema = new SimpleSchema({
  owner: String,
  createdAt: Date,
  diveTime: Number,
  diveDepth: Number,
  oxygenPercent: Number,
  oxygenSize: Number,
  sac: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Dives.attachSchema(DiveSchema);

/** Make the collection and schema available to other code. */
export { Dives, DiveSchema };
