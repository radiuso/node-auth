/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Set default node environment to development

	var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	if (env === 'development' || env === 'test') {
	  // Register the Babel require hook
	  __webpack_require__(1);
	}

	// Export the application
	exports = module.exports = __webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-register");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Main application file
	 */

	'use strict';

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _environment = __webpack_require__(5);

	var _environment2 = _interopRequireDefault(_environment);

	var _http = __webpack_require__(13);

	var _http2 = _interopRequireDefault(_http);

	var _seed = __webpack_require__(14);

	var _seed2 = _interopRequireDefault(_seed);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_mongoose2.default.Promise = __webpack_require__(21);


	// Connect to MongoDB
	_mongoose2.default.connect(_environment2.default.mongo.uri, _environment2.default.mongo.options);
	_mongoose2.default.connection.on('error', function (err) {
	  console.error('MongoDB connection error: ' + err);
	  process.exit(-1); // eslint-disable-line no-process-exit
	});

	// Setup server
	var app = (0, _express2.default)();
	var server = _http2.default.createServer(app);
	var socketio = __webpack_require__(22)(server, {
	  serveClient: _environment2.default.env !== 'production',
	  path: '/socket.io-client'
	});
	__webpack_require__(23).default(socketio);
	__webpack_require__(25).default(app);
	__webpack_require__(39).default(app);

	// Start server
	function startServer() {
	  app.nodeAuth = server.listen(_environment2.default.port, _environment2.default.ip, function () {
	    console.log('Express server listening on %d, in %s mode', _environment2.default.port, app.get('env'));
	  });
	}

	(0, _seed2.default)();
	setImmediate(startServer);

	// Expose app
	exports = module.exports = app;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	/*eslint no-process-env:0*/

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _lodash = __webpack_require__(7);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*function requiredProcessEnv(name) {
	  if(!process.env[name]) {
	    throw new Error('You must set the ' + name + ' environment variable');
	  }
	  return process.env[name];
	}*/

	// All configurations will extend these options
	// ============================================
	var all = {
	  env: process.env.NODE_ENV,

	  // Root path of server
	  root: _path2.default.normalize(__dirname + '/../../..'),

	  clientRoot: _path2.default.join(_path2.default.normalize(__dirname + '/../../..'), 'public'),

	  // Browser-sync port
	  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

	  // Server port
	  port: process.env.PORT || 9000,

	  // Server IP
	  ip: process.env.IP || '0.0.0.0',

	  // Should we populate the DB with sample data?
	  seedDB: false,

	  // Secret for session, you will want to change this and make it an environment variable
	  secrets: {
	    session: 'node-auth-secret'
	  },

	  // MongoDB connection options
	  mongo: {
	    options: {
	      db: {
	        safe: true
	      }
	    }
	  },

	  facebook: {
	    clientID: process.env.FACEBOOK_ID || 'id',
	    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
	    callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
	  },

	  twitter: {
	    clientID: process.env.TWITTER_ID || 'id',
	    clientSecret: process.env.TWITTER_SECRET || 'secret',
	    callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
	  },

	  google: {
	    clientID: process.env.GOOGLE_ID || 'id',
	    clientSecret: process.env.GOOGLE_SECRET || 'secret',
	    callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
	  }
	};

	// Export the config object based on the NODE_ENV
	// ==============================================
	module.exports = _lodash2.default.merge(all, __webpack_require__(8), __webpack_require__(9)("./" + process.env.NODE_ENV + '.js') || {});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	exports = module.exports = {
	  // List of user roles
	  userRoles: ['guest', 'user', 'admin']
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./development.js": 10,
		"./index.js": 5,
		"./production.js": 11,
		"./shared.js": 8,
		"./test.js": 12
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 9;


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/*eslint no-process-env:0*/

	// Development specific configuration
	// ==================================

	module.exports = {

	  // MongoDB connection options
	  mongo: {
	    uri: 'mongodb://localhost/nodeauth-dev'
	  },

	  // Seed database on startup
	  seedDB: true

	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint no-process-env:0*/

	// Production specific configuration
	// =================================
	module.exports = {
	  // Server IP
	  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.ip || undefined,

	  // Server port
	  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

	  // MongoDB connection options
	  mongo: {
	    uri: process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/nodeauth'
	  },

	  clientRoot: _path2.default.join(_path2.default.normalize(__dirname + '/../../..'), 'build')

	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	/*eslint no-process-env:0*/

	// Test specific configuration
	// ===========================

	module.exports = {
	  // MongoDB connection options
	  mongo: {
	    uri: 'mongodb://localhost/nodeauth-test'
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Populate DB with sample data on server start
	 * to disable, edit config/environment/index.js, and set `seedDB: false`
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = seedDatabaseIfNeeded;

	var _thing = __webpack_require__(15);

	var _thing2 = _interopRequireDefault(_thing);

	var _user = __webpack_require__(18);

	var _user2 = _interopRequireDefault(_user);

	var _environment = __webpack_require__(5);

	var _environment2 = _interopRequireDefault(_environment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function seedDatabaseIfNeeded() {
	  if (_environment2.default.seedDB) {
	    console.log('Seeding...');
	    _thing2.default.find({}).remove().then(function () {
	      return _thing2.default.create({
	        name: 'Development Tools',
	        info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, ' + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, ' + 'Stylus, Sass, and Less.'
	      }, {
	        name: 'Server and Client integration',
	        info: 'Built with a powerful and fun stack: MongoDB, Express, ' + ' and Node.'
	      }, {
	        name: 'Smart Build System',
	        info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
	      }, {
	        name: 'Modular Structure',
	        info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
	      }, {
	        name: 'Optimized Build',
	        info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
	      }, {
	        name: 'Deployment Ready',
	        info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
	      });
	    }).then(function () {
	      return console.log('finished populating things');
	    }).catch(function (err) {
	      return console.log('error populating things', err);
	    });

	    _user2.default.find({}).remove().then(function () {
	      return _user2.default.create({
	        provider: 'local',
	        name: 'Test User',
	        email: 'test@example.com',
	        password: 'test'
	      }, {
	        provider: 'local',
	        role: 'admin',
	        name: 'Admin',
	        email: 'admin@example.com',
	        password: 'admin'
	      }).then(function () {
	        return console.log('finished populating users');
	      }).catch(function (err) {
	        return console.log('error populating users', err);
	      });
	    });
	  }
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _thing = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ThingSchema = new _mongoose2.default.Schema({
	  name: String,
	  info: String,
	  active: Boolean
	});

	(0, _thing.registerEvents)(ThingSchema);
	exports.default = _mongoose2.default.model('Thing', ThingSchema);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Thing model events
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerEvents = undefined;

	var _events = __webpack_require__(17);

	var ThingEvents = new _events.EventEmitter();

	// Set max event listeners (0 == unlimited)
	ThingEvents.setMaxListeners(0);

	// Model events
	var events = {
	  save: 'save',
	  remove: 'remove'
	};

	// Register the event emitter to the model events
	function registerEvents(Thing) {
	  for (var e in events) {
	    var event = events[e];
	    Thing.post(e, emitEvent(event));
	  }
	}

	function emitEvent(event) {
	  return function (doc) {
	    ThingEvents.emit(event + ':' + doc._id, doc);
	    ThingEvents.emit(event, doc);
	  };
	}

	exports.registerEvents = registerEvents;
	exports.default = ThingEvents;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*eslint no-invalid-this:0*/

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _crypto = __webpack_require__(19);

	var _crypto2 = _interopRequireDefault(_crypto);

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _user = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_mongoose2.default.Promise = __webpack_require__(21);

	var authTypes = ['github', 'twitter', 'facebook', 'google'];

	var UserSchema = new _mongoose.Schema({
	  name: String,
	  email: {
	    type: String,
	    lowercase: true,
	    required: function required() {
	      if (authTypes.indexOf(this.provider) === -1) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  },
	  role: {
	    type: String,
	    default: 'user'
	  },
	  password: {
	    type: String,
	    required: function required() {
	      if (authTypes.indexOf(this.provider) === -1) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  },
	  provider: String,
	  salt: String,
	  facebook: {},
	  twitter: {},
	  google: {},
	  github: {}
	});

	/**
	 * Virtuals
	 */

	// Public profile information
	UserSchema.virtual('profile').get(function () {
	  return {
	    name: this.name,
	    role: this.role
	  };
	});

	// Non-sensitive info we'll be putting in the token
	UserSchema.virtual('token').get(function () {
	  return {
	    _id: this._id,
	    role: this.role
	  };
	});

	/**
	 * Validations
	 */

	// Validate empty email
	UserSchema.path('email').validate(function (email) {
	  if (authTypes.indexOf(this.provider) !== -1) {
	    return true;
	  }
	  return email.length;
	}, 'Email cannot be blank');

	// Validate empty password
	UserSchema.path('password').validate(function (password) {
	  if (authTypes.indexOf(this.provider) !== -1) {
	    return true;
	  }
	  return password.length;
	}, 'Password cannot be blank');

	// Validate email is not taken
	UserSchema.path('email').validate(function (value, respond) {
	  var _this = this;

	  if (authTypes.indexOf(this.provider) !== -1) {
	    return respond(true);
	  }

	  return this.constructor.findOne({ email: value }).exec().then(function (user) {
	    if (user) {
	      if (_this.id === user.id) {
	        return respond(true);
	      }
	      return respond(false);
	    }
	    return respond(true);
	  }).catch(function (err) {
	    throw err;
	  });
	}, 'The specified email address is already in use.');

	var validatePresenceOf = function validatePresenceOf(value) {
	  return value && value.length;
	};

	/**
	 * Pre-save hook
	 */
	UserSchema.pre('save', function (next) {
	  var _this2 = this;

	  // Handle new/update passwords
	  if (!this.isModified('password')) {
	    return next();
	  }

	  if (!validatePresenceOf(this.password)) {
	    if (authTypes.indexOf(this.provider) === -1) {
	      return next(new Error('Invalid password'));
	    } else {
	      return next();
	    }
	  }

	  // Make salt with a callback
	  this.makeSalt(function (saltErr, salt) {
	    if (saltErr) {
	      return next(saltErr);
	    }
	    _this2.salt = salt;
	    _this2.encryptPassword(_this2.password, function (encryptErr, hashedPassword) {
	      if (encryptErr) {
	        return next(encryptErr);
	      }
	      _this2.password = hashedPassword;
	      return next();
	    });
	  });
	});

	/**
	 * Methods
	 */
	UserSchema.methods = {
	  /**
	   * Authenticate - check if the passwords are the same
	   *
	   * @param {String} password
	   * @param {Function} callback
	   * @return {Boolean}
	   * @api public
	   */
	  authenticate: function authenticate(password, callback) {
	    var _this3 = this;

	    if (!callback) {
	      return this.password === this.encryptPassword(password);
	    }

	    this.encryptPassword(password, function (err, pwdGen) {
	      if (err) {
	        return callback(err);
	      }

	      if (_this3.password === pwdGen) {
	        return callback(null, true);
	      } else {
	        return callback(null, false);
	      }
	    });
	  },


	  /**
	   * Make salt
	   *
	   * @param {Number} [byteSize] - Optional salt byte size, default to 16
	   * @param {Function} callback
	   * @return {String}
	   * @api public
	   */
	  makeSalt: function makeSalt(byteSize, callback) {
	    var defaultByteSize = 16;

	    if (typeof arguments[0] === 'function') {
	      callback = arguments[0];
	      byteSize = defaultByteSize;
	    } else if (typeof arguments[1] === 'function') {
	      callback = arguments[1];
	    } else {
	      throw new Error('Missing Callback');
	    }

	    if (!byteSize) {
	      byteSize = defaultByteSize;
	    }

	    return _crypto2.default.randomBytes(byteSize, function (err, salt) {
	      if (err) {
	        return callback(err);
	      } else {
	        return callback(null, salt.toString('base64'));
	      }
	    });
	  },


	  /**
	   * Encrypt password
	   *
	   * @param {String} password
	   * @param {Function} callback
	   * @return {String}
	   * @api public
	   */
	  encryptPassword: function encryptPassword(password, callback) {
	    if (!password || !this.salt) {
	      if (!callback) {
	        return null;
	      } else {
	        return callback('Missing password or salt');
	      }
	    }

	    var defaultIterations = 10000;
	    var defaultKeyLength = 64;
	    var defaultDigest = 'SHA256';
	    var salt = new Buffer(this.salt, 'base64');

	    if (!callback) {
	      return _crypto2.default.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, defaultDigest).toString('base64');
	    }

	    return _crypto2.default.pbkdf2(password, salt, defaultIterations, defaultKeyLength, defaultDigest, function (err, key) {
	      if (err) {
	        return callback(err);
	      } else {
	        return callback(null, key.toString('base64'));
	      }
	    });
	  }
	};

	(0, _user.registerEvents)(UserSchema);
	exports.default = _mongoose2.default.model('User', UserSchema);

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * User model events
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerEvents = undefined;

	var _events = __webpack_require__(17);

	var UserEvents = new _events.EventEmitter();

	// Set max event listeners (0 == unlimited)
	UserEvents.setMaxListeners(0);

	// Model events
	var events = {
	  save: 'save',
	  remove: 'remove'
	};

	// Register the event emitter to the model events
	function registerEvents(User) {
	  for (var e in events) {
	    var event = events[e];
	    User.post(e, emitEvent(event));
	  }
	}

	function emitEvent(event) {
	  return function (doc) {
	    UserEvents.emit(event + ':' + doc._id, doc);
	    UserEvents.emit(event, doc);
	  };
	}

	exports.registerEvents = registerEvents;
	exports.default = UserEvents;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Socket.io configuration
	 */
	'use strict';

	// import config from './environment';

	// When the user disconnects.. perform this

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (socketio) {
	  // socket.io (v1.x.x) is powered by debug.
	  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
	  //
	  // ex: DEBUG: "http*,socket.io:socket"

	  // We can authenticate socket.io users and access their token through socket.decoded_token
	  //
	  // 1. You will need to send the token in `client/components/socket/socket.service.js`
	  //
	  // 2. Require authentication here:
	  // socketio.use(require('socketio-jwt').authorize({
	  //   secret: config.secrets.session,
	  //   handshake: true
	  // }));

	  socketio.on('connection', function (socket) {
	    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;

	    socket.connectedAt = new Date();

	    socket.log = function () {
	      var _console;

	      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
	        data[_key] = arguments[_key];
	      }

	      (_console = console).log.apply(_console, ['SocketIO ' + socket.nsp.name + ' [' + socket.address + ']'].concat(data));
	    };

	    // Call onDisconnect.
	    socket.on('disconnect', function () {
	      onDisconnect(socket);
	      socket.log('DISCONNECTED');
	    });

	    // Call onConnect.
	    onConnect(socket);
	    socket.log('CONNECTED');
	  });
	};

	function onDisconnect() /*socket*/{}

	// When the user connects.. perform this
	function onConnect(socket) {
	  // When the client emits 'info', this listens and executes
	  socket.on('info', function (data) {
	    socket.log(JSON.stringify(data, null, 2));
	  });

	  // Insert sockets below
	  __webpack_require__(24).register(socket);
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Broadcast updates to client when the model changes
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.register = register;

	var _thing = __webpack_require__(16);

	var _thing2 = _interopRequireDefault(_thing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Model events to emit
	var events = ['save', 'remove'];

	function register(socket) {
	  // Bind model events to socket events
	  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
	    var event = events[i];
	    var listener = createListener('thing:' + event, socket);

	    _thing2.default.on(event, listener);
	    socket.on('disconnect', removeListener(event, listener));
	  }
	}

	function createListener(event, socket) {
	  return function (doc) {
	    socket.emit(event, doc);
	  };
	}

	function removeListener(event, listener) {
	  return function () {
	    _thing2.default.removeListener(event, listener);
	  };
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Express configuration
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (app) {
	  var env = app.get('env');

	  if (env === 'development' || env === 'test') {
	    app.use(_express2.default.static(_path2.default.join(_environment2.default.root, '.tmp')));
	    app.use(function (req, res, next) {
	      res.setHeader('Access-Control-Allow-Origin', '*');
	      res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
	      res.setHeader('Access-Control-Allow-Methods', '*');
	      res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	      res.setHeader('Access-Control-Max-Age', '1000');
	      return next();
	    });
	    app.use((0, _errorhandler2.default)()); // Error handler - has to be last
	  }

	  if (env === 'production') {
	    app.use((0, _serveFavicon2.default)(_path2.default.join(_environment2.default.clientRoot, 'favicon.ico')));
	  }

	  app.set('appPath', _environment2.default.clientRoot);
	  app.use(_express2.default.static(app.get('appPath')));
	  app.use((0, _morgan2.default)('dev'));

	  app.set('views', _environment2.default.root + '/server/views');
	  app.engine('html', __webpack_require__(26).renderFile);
	  app.set('view engine', 'html');
	  app.use((0, _shrinkRay2.default)());
	  app.use(_bodyParser2.default.urlencoded({ extended: false }));
	  app.use(_bodyParser2.default.json());
	  app.use((0, _methodOverride2.default)());
	  app.use((0, _cookieParser2.default)());
	  app.use(_passport2.default.initialize());
	  app.use((0, _helmet2.default)());

	  // Persist sessions with MongoStore / sequelizeStore
	  // We need to enable sessions for passport-twitter because it's an
	  // oauth 1.0 strategy, and Lusca depends on sessions
	  app.use((0, _expressSession2.default)({
	    secret: _environment2.default.secrets.session,
	    saveUninitialized: true,
	    resave: false,
	    store: new MongoStore({
	      mongooseConnection: _mongoose2.default.connection,
	      db: 'node-auth'
	    })
	  }));

	  /**
	   * Lusca - express server security
	   * https://github.com/krakenjs/lusca
	   */
	  if (env !== 'test' && env !== 'development' && !process.env.SAUCE_USERNAME) {
	    app.use((0, _lusca2.default)({
	      csrf: {
	        angular: false
	      },
	      xframe: 'SAMEORIGIN',
	      hsts: {
	        maxAge: 31536000, //1 year, in seconds
	        includeSubDomains: true,
	        preload: true
	      },
	      xssProtection: true
	    }));
	  }

	  if (env === 'development' || env === 'test') {
	    app.use((0, _errorhandler2.default)()); // Error handler - has to be last
	  }
	};

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _serveFavicon = __webpack_require__(27);

	var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

	var _morgan = __webpack_require__(28);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _shrinkRay = __webpack_require__(29);

	var _shrinkRay2 = _interopRequireDefault(_shrinkRay);

	var _bodyParser = __webpack_require__(30);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _methodOverride = __webpack_require__(31);

	var _methodOverride2 = _interopRequireDefault(_methodOverride);

	var _cookieParser = __webpack_require__(32);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _errorhandler = __webpack_require__(33);

	var _errorhandler2 = _interopRequireDefault(_errorhandler);

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _lusca = __webpack_require__(34);

	var _lusca2 = _interopRequireDefault(_lusca);

	var _environment = __webpack_require__(5);

	var _environment2 = _interopRequireDefault(_environment);

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _expressSession = __webpack_require__(36);

	var _expressSession2 = _interopRequireDefault(_expressSession);

	var _connectMongo = __webpack_require__(37);

	var _connectMongo2 = _interopRequireDefault(_connectMongo);

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _helmet = __webpack_require__(38);

	var _helmet2 = _interopRequireDefault(_helmet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("ejs");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("shrink-ray");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("method-override");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("errorhandler");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("lusca");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("connect-mongo");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Main application routes
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (app) {
	  // Insert routes below
	  app.use('/api/things', __webpack_require__(40));
	  app.use('/api/users', __webpack_require__(43));

	  app.use('/auth', __webpack_require__(49).default);

	  // All undefined asset or api routes should return a 404
	  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

	  // All other routes should redirect to the index.html
	  app.route('/*').get(function (req, res) {
	    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
	  });
	};

	var _errors = __webpack_require__(62);

	var _errors2 = _interopRequireDefault(_errors);

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(3);
	var controller = __webpack_require__(41);

	var router = express.Router();

	router.get('/', controller.index);
	router.get('/:id', controller.show);
	router.post('/', controller.create);
	router.put('/:id', controller.upsert);
	router.patch('/:id', controller.patch);
	router.delete('/:id', controller.destroy);

	module.exports = router;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Using Rails-like standard naming convention for endpoints.
	 * GET     /api/things              ->  index
	 * POST    /api/things              ->  create
	 * GET     /api/things/:id          ->  show
	 * PUT     /api/things/:id          ->  upsert
	 * PATCH   /api/things/:id          ->  patch
	 * DELETE  /api/things/:id          ->  destroy
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.index = index;
	exports.show = show;
	exports.create = create;
	exports.upsert = upsert;
	exports.patch = patch;
	exports.destroy = destroy;

	var _fastJsonPatch = __webpack_require__(42);

	var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

	var _thing = __webpack_require__(15);

	var _thing2 = _interopRequireDefault(_thing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function respondWithResult(res, statusCode) {
	  statusCode = statusCode || 200;
	  return function (entity) {
	    if (entity) {
	      return res.status(statusCode).json(entity);
	    }
	    return null;
	  };
	}

	function patchUpdates(patches) {
	  return function (entity) {
	    try {
	      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
	    } catch (err) {
	      return Promise.reject(err);
	    }

	    return entity.save();
	  };
	}

	function removeEntity(res) {
	  return function (entity) {
	    if (entity) {
	      return entity.remove().then(function () {
	        res.status(204).end();
	      });
	    }
	  };
	}

	function handleEntityNotFound(res) {
	  return function (entity) {
	    if (!entity) {
	      res.status(404).end();
	      return null;
	    }
	    return entity;
	  };
	}

	function handleError(res, statusCode) {
	  statusCode = statusCode || 500;
	  return function (err) {
	    res.status(statusCode).send(err);
	  };
	}

	// Gets a list of Things
	function index(req, res) {
	  return _thing2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
	}

	// Gets a single Thing from the DB
	function show(req, res) {
	  return _thing2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
	}

	// Creates a new Thing in the DB
	function create(req, res) {
	  return _thing2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
	}

	// Upserts the given Thing in the DB at the specified ID
	function upsert(req, res) {
	  if (req.body._id) {
	    delete req.body._id;
	  }
	  return _thing2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
	}

	// Updates an existing Thing in the DB
	function patch(req, res) {
	  if (req.body._id) {
	    delete req.body._id;
	  }
	  return _thing2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
	}

	// Deletes a Thing from the DB
	function destroy(req, res) {
	  return _thing2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("fast-json-patch");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(3);

	var _user = __webpack_require__(44);

	var controller = _interopRequireWildcard(_user);

	var _auth = __webpack_require__(46);

	var auth = _interopRequireWildcard(_auth);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.get('/', auth.hasRole('admin'), controller.index);
	router.delete('/:id', auth.hasRole('admin'), controller.destroy);
	router.get('/me', auth.isAuthenticated(), controller.me);
	router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
	router.get('/:id', auth.isAuthenticated(), controller.show);
	router.post('/', controller.create);

	module.exports = router;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.index = index;
	exports.create = create;
	exports.show = show;
	exports.destroy = destroy;
	exports.changePassword = changePassword;
	exports.me = me;
	exports.authCallback = authCallback;

	var _user = __webpack_require__(18);

	var _user2 = _interopRequireDefault(_user);

	var _environment = __webpack_require__(5);

	var _environment2 = _interopRequireDefault(_environment);

	var _jsonwebtoken = __webpack_require__(45);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validationError(res, statusCode) {
	  statusCode = statusCode || 422;
	  return function (err) {
	    return res.status(statusCode).json(err);
	  };
	}

	function handleError(res, statusCode) {
	  statusCode = statusCode || 500;
	  return function (err) {
	    return res.status(statusCode).send(err);
	  };
	}

	/**
	 * Get list of users
	 * restriction: 'admin'
	 */
	function index(req, res) {
	  return _user2.default.find({}, '-salt -password').exec().then(function (users) {
	    res.status(200).json(users);
	  }).catch(handleError(res));
	}

	/**
	 * Creates a new user
	 */
	function create(req, res) {
	  var newUser = new _user2.default(req.body);
	  newUser.provider = 'local';
	  newUser.role = 'user';
	  newUser.save().then(function (user) {
	    var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
	      expiresIn: 60 * 60 * 5
	    });
	    res.json({ token: token });
	  }).catch(validationError(res));
	}

	/**
	 * Get a single user
	 */
	function show(req, res, next) {
	  var userId = req.params.id;

	  return _user2.default.findById(userId).exec().then(function (user) {
	    if (!user) {
	      return res.status(404).end();
	    }
	    res.json(user.profile);
	  }).catch(function (err) {
	    return next(err);
	  });
	}

	/**
	 * Deletes a user
	 * restriction: 'admin'
	 */
	function destroy(req, res) {
	  return _user2.default.findByIdAndRemove(req.params.id).exec().then(function () {
	    res.status(204).end();
	  }).catch(handleError(res));
	}

	/**
	 * Change a users password
	 */
	function changePassword(req, res) {
	  var userId = req.user._id;
	  var oldPass = String(req.body.oldPassword);
	  var newPass = String(req.body.newPassword);

	  return _user2.default.findById(userId).exec().then(function (user) {
	    if (user.authenticate(oldPass)) {
	      user.password = newPass;
	      return user.save().then(function () {
	        res.status(204).end();
	      }).catch(validationError(res));
	    } else {
	      return res.status(403).end();
	    }
	  });
	}

	/**
	 * Get my info
	 */
	function me(req, res, next) {
	  var userId = req.user._id;

	  return _user2.default.findOne({ _id: userId }, '-salt -password').exec().then(function (user) {
	    // don't ever give out the password or salt
	    if (!user) {
	      return res.status(401).end();
	    }
	    res.json(user);
	  }).catch(function (err) {
	    return next(err);
	  });
	}

	/**
	 * Authentication callback
	 */
	function authCallback(req, res) {
	  res.redirect('/');
	}

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isAuthenticated = isAuthenticated;
	exports.hasRole = hasRole;
	exports.signToken = signToken;
	exports.setTokenCookie = setTokenCookie;

	var _environment = __webpack_require__(5);

	var _environment2 = _interopRequireDefault(_environment);

	var _jsonwebtoken = __webpack_require__(45);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _expressJwt = __webpack_require__(47);

	var _expressJwt2 = _interopRequireDefault(_expressJwt);

	var _composableMiddleware = __webpack_require__(48);

	var _composableMiddleware2 = _interopRequireDefault(_composableMiddleware);

	var _user = __webpack_require__(18);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validateJwt = (0, _expressJwt2.default)({
	  secret: _environment2.default.secrets.session
	});

	/**
	 * Attaches the user object to the request if authenticated
	 * Otherwise returns 403
	 */
	function isAuthenticated() {
	  return (0, _composableMiddleware2.default)()
	  // Validate jwt
	  .use(function (req, res, next) {
	    // allow access_token to be passed through query parameter as well
	    if (req.query && req.query.hasOwnProperty('access_token')) {
	      req.headers.authorization = 'Bearer ' + req.query.access_token;
	    }
	    // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
	    if (req.query && typeof req.headers.authorization === 'undefined') {
	      req.headers.authorization = 'Bearer ' + req.cookies.token;
	    }
	    validateJwt(req, res, next);
	  })
	  // Attach user to request
	  .use(function (req, res, next) {
	    _user2.default.findById(req.user._id).exec().then(function (user) {
	      if (!user) {
	        return res.status(401).end();
	      }
	      req.user = user;
	      next();
	    }).catch(function (err) {
	      return next(err);
	    });
	  });
	}

	/**
	 * Checks if the user role meets the minimum requirements of the route
	 */
	function hasRole(roleRequired) {
	  if (!roleRequired) {
	    throw new Error('Required role needs to be set');
	  }

	  return (0, _composableMiddleware2.default)().use(isAuthenticated()).use(function meetsRequirements(req, res, next) {
	    if (_environment2.default.userRoles.indexOf(req.user.role) >= _environment2.default.userRoles.indexOf(roleRequired)) {
	      return next();
	    } else {
	      return res.status(403).send('Forbidden');
	    }
	  });
	}

	/**
	 * Returns a jwt token signed by the app secret
	 */
	function signToken(id, role) {
	  return _jsonwebtoken2.default.sign({ _id: id, role: role }, _environment2.default.secrets.session, {
	    expiresIn: 60 * 60 * 5
	  });
	}

	/**
	 * Set token cookie directly for oAuth strategies
	 */
	function setTokenCookie(req, res) {
	  if (!req.user) {
	    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
	  }
	  var token = signToken(req.user._id, req.user.role);
	  res.cookie('token', token);
	  res.redirect('/');
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("express-jwt");

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("composable-middleware");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _environment = __webpack_require__(5);

	var _environment2 = _interopRequireDefault(_environment);

	var _user = __webpack_require__(18);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Passport Configuration
	__webpack_require__(50).setup(_user2.default, _environment2.default);
	__webpack_require__(52).setup(_user2.default, _environment2.default);
	__webpack_require__(54).setup(_user2.default, _environment2.default);
	__webpack_require__(56).setup(_user2.default, _environment2.default);

	var router = _express2.default.Router();

	router.use('/local', __webpack_require__(58).default);
	router.use('/facebook', __webpack_require__(59).default);
	router.use('/twitter', __webpack_require__(60).default);
	router.use('/google', __webpack_require__(61).default);

	exports.default = router;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setup = setup;

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _passportLocal = __webpack_require__(51);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function localAuthenticate(User, email, password, done) {
	  User.findOne({
	    email: email.toLowerCase()
	  }).exec().then(function (user) {
	    if (!user) {
	      return done(null, false, {
	        message: 'This email is not registered.'
	      });
	    }
	    user.authenticate(password, function (authError, authenticated) {
	      if (authError) {
	        return done(authError);
	      }
	      if (!authenticated) {
	        return done(null, false, { message: 'This password is not correct.' });
	      } else {
	        return done(null, user);
	      }
	    });
	  }).catch(function (err) {
	    return done(err);
	  });
	}

	function setup(User /*, config*/) {
	  _passport2.default.use(new _passportLocal.Strategy({
	    usernameField: 'email',
	    passwordField: 'password' // this is the virtual field on the model
	  }, function (email, password, done) {
	    return localAuthenticate(User, email, password, done);
	  }));
	}

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setup = setup;

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _passportFacebook = __webpack_require__(53);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setup(User, config) {
	  _passport2.default.use(new _passportFacebook.Strategy({
	    clientID: config.facebook.clientID,
	    clientSecret: config.facebook.clientSecret,
	    callbackURL: config.facebook.callbackURL,
	    profileFields: ['displayName', 'emails']
	  }, function (accessToken, refreshToken, profile, done) {
	    User.findOne({ 'facebook.id': profile.id }).exec().then(function (user) {
	      if (user) {
	        return done(null, user);
	      }

	      user = new User({
	        name: profile.displayName,
	        email: profile.emails[0].value,
	        role: 'user',
	        provider: 'facebook',
	        facebook: profile._json
	      });
	      user.save().then(function (savedUser) {
	        return done(null, savedUser);
	      }).catch(function (err) {
	        return done(err);
	      });
	    }).catch(function (err) {
	      return done(err);
	    });
	  }));
	}

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("passport-facebook");

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setup = setup;

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _passportGoogleOauth = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setup(User, config) {
	  _passport2.default.use(new _passportGoogleOauth.Strategy({
	    clientID: config.google.clientID,
	    clientSecret: config.google.clientSecret,
	    callbackURL: config.google.callbackURL
	  }, function (accessToken, refreshToken, profile, done) {
	    User.findOne({ 'google.id': profile.id }).exec().then(function (user) {
	      if (user) {
	        return done(null, user);
	      }

	      user = new User({
	        name: profile.displayName,
	        email: profile.emails[0].value,
	        role: 'user',
	        username: profile.emails[0].value.split('@')[0],
	        provider: 'google',
	        google: profile._json
	      });
	      user.save().then(function (savedUser) {
	        return done(null, savedUser);
	      }).catch(function (err) {
	        return done(err);
	      });
	    }).catch(function (err) {
	      return done(err);
	    });
	  }));
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("passport-google-oauth20");

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setup = setup;

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _passportTwitter = __webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setup(User, config) {
	  _passport2.default.use(new _passportTwitter.Strategy({
	    consumerKey: config.twitter.clientID,
	    consumerSecret: config.twitter.clientSecret,
	    callbackURL: config.twitter.callbackURL
	  }, function (token, tokenSecret, profile, done) {
	    profile._json.id = '' + profile._json.id;
	    profile.id = '' + profile.id;

	    User.findOne({ 'twitter.id': profile.id }).exec().then(function (user) {
	      if (user) {
	        return done(null, user);
	      }

	      user = new User({
	        name: profile.displayName,
	        username: profile.username,
	        role: 'user',
	        provider: 'twitter',
	        twitter: profile._json
	      });
	      user.save().then(function (savedUser) {
	        return done(null, savedUser);
	      }).catch(function (err) {
	        return done(err);
	      });
	    }).catch(function (err) {
	      return done(err);
	    });
	  }));
	}

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("passport-twitter");

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _auth = __webpack_require__(46);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post('/', function (req, res, next) {
	  _passport2.default.authenticate('local', function (err, user, info) {
	    var error = err || info;
	    if (error) {
	      return res.status(401).json(error);
	    }
	    if (!user) {
	      return res.status(404).json({ message: 'Something went wrong, please try again.' });
	    }

	    var token = (0, _auth.signToken)(user._id, user.role);
	    res.json({ token: token });
	  })(req, res, next);
	});

	exports.default = router;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _auth = __webpack_require__(46);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get('/', _passport2.default.authenticate('facebook', {
	  scope: ['email', 'user_about_me'],
	  failureRedirect: '/signup',
	  session: false
	})).get('/callback', _passport2.default.authenticate('facebook', {
	  failureRedirect: '/signup',
	  session: false
	}), _auth.setTokenCookie);

	exports.default = router;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _auth = __webpack_require__(46);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get('/', _passport2.default.authenticate('twitter', {
	  failureRedirect: '/signup',
	  session: false
	})).get('/callback', _passport2.default.authenticate('twitter', {
	  failureRedirect: '/signup',
	  session: false
	}), _auth.setTokenCookie);

	exports.default = router;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(35);

	var _passport2 = _interopRequireDefault(_passport);

	var _auth = __webpack_require__(46);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get('/', _passport2.default.authenticate('google', {
	  failureRedirect: '/signup',
	  scope: ['profile', 'email'],
	  session: false
	})).get('/callback', _passport2.default.authenticate('google', {
	  failureRedirect: '/signup',
	  session: false
	}), _auth.setTokenCookie);

	exports.default = router;

/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Error responses
	 */

	'use strict';

	module.exports[404] = function pageNotFound(req, res) {
	  var viewFilePath = '404';
	  var statusCode = 404;
	  var result = {
	    status: statusCode
	  };

	  res.status(result.status);
	  res.render(viewFilePath, {}, function (err, html) {
	    if (err) {
	      return res.status(result.status).json(result);
	    }

	    res.send(html);
	  });
	};

/***/ }
/******/ ]);