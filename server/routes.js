/**
 * Main application routes
 */

'use strict';
import path from 'path';

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  res.status(500).send({ 
    error: {
      name: err.name,
      message: err.message,
      code: err.code
    }
  });
}

export default function(app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get((req, res) => {
     res.status(404).json({ error: 'This feature is not yet available.'});
   });

  // handle errors
  app.use(logErrors);
  app.use(clientErrorHandler);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
