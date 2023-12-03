const express = require('express');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const { customersRouter } = require('./routers/customers');

const app = express();
const log = log4js.getLogger('server');

log.level = 'debug';

app.disable('x-powered-by');

app.use(
  bodyParser.json({
    limit: '1kb',
  }),
);

app.get('/version', (res) => {
  log.debug('/version');

  res.status(200).json({
    status: 'ok',
    data: {
      version: '1.0.0',
    },
  });
});

app.use('/api/v1/customers', customersRouter);

module.exports = {
  app,
};
