'use strict';
/*eslint no-process-env:0*/
import path from 'path';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/nodeauth-test'
  },
  
  clientRoot: path.join(path.normalize(`${__dirname}/../../..`), 'public'),
};
