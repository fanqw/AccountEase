const loggerMiddleware = require('./logger');
const {
  jsonParser,
  urlencodedParser,
} = require('./bodyParser');
const corsMiddleware = require('./cors');
const helmetMiddleware = require('./helmet');
const compressionMiddleware = require('./compression');
const {
  cookieParserMiddleware,
  sessionMiddleware,
} = require('./cookieSession');
const passport = require('./passport');

function applyMiddleware(app) {
  app.use(loggerMiddleware(process.env.NODE_ENV));
  app.use(jsonParser);
  app.use(urlencodedParser);
  app.use(corsMiddleware);
  app.use(helmetMiddleware);
  app.use(compressionMiddleware);
  app.use(cookieParserMiddleware);
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = applyMiddleware;