'use strict';
/*eslint no-process-env:0*/
import path from 'path';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/nodeauth-dev'
  },

  // Seed database on startup
  seedDB: true,

  clientRoot: path.join(path.normalize(`${__dirname}/../../..`), 'public'),

};
