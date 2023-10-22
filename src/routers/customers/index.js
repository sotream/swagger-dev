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

customersRouter.get('/', async (req, res) => {
  const defaultPageSize = 25;
  const defaultPageNumber = 1;

  log.info(
    `Get all customers request query params ${JSON.stringify(
      req.query,
    )} default page size ${defaultPageSize} default page number ${defaultPageNumber}`,
  );

  try {
    const { size = defaultPageSize, page = defaultPageNumber } = req.query;
    const rawCustomers = await db.Customer.findAll({
      where: {},
      limit: Number(size),
      offset: (Number(page) - 1) * Number(size),
      order: [['id', 'DESC']],
    });

    const customers = rawCustomers.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        created: customer.createdAt,
        updated: customer.updatedAt,
      };
    });

    log.debug('All customers', JSON.stringify(customers));

    res.status(200).json({
      status: 'ok',
      data: customers,
    });
  } catch (error) {
    log.error('Get all customers error', error);

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
