const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./resources/logger/logger.service');
const errHandler = require('./resources/errorhandler/error.handler.js');

process.on('uncaughtException', err => {
  logger.logError({ err, reason: 'uncaughtException' });
  process.exit(1);
});

// process.on('unhandledRejection', err => {
//  logger.logError({err: err, reason: 'unhandledRejection'} );
//  process.exit(1);
// });

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('*', (req, res, next) => {
  logger.logQery(req);
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(
  '/boards/:boardId/tasks',
  (req, res, next) => {
    // taskRouter.boardId = req.params.boardId;
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

app.use('*', (req, res, next) => {
  next({ status: '400', send: 'Bad request!' });
});

app.use(errHandler.errHandler);

module.exports = app;
