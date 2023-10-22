const express = require('express');
const log4js = require('log4js');
const bcrypt = require('bcrypt');

const db = require('../../database/models');

const customersRouter = express.Router();
const log = log4js.getLogger('customersRouter');
log.level = 'debug';

customersRouter.post('/', async (req, res) => {
  log.info('Creates customers request body', req.body);

  try {
    const customerToCreate = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 11),
    };

    const customer = await db.Customer.create(customerToCreate);

    res.status(201).json({
      status: 'ok',
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        created: customer.createdAt,
      },
    });
  } catch (error) {
    log.error('Create customer error', error);

    res.status(error.code || 400).json({
      status: 'error',
      data: {
        message: error.message || 'Internal error',
      },
    });
  }
});

module.exports = {
  customersRouter,
};
