const express = require('express');
const log4js = require('log4js');
const bcrypt = require('bcrypt');

const db = require('../../database/models');
const {
  getUpdateCustomerParams,
  formatCustomer,
} = require('../../utils/customer');

const customersRouter = express.Router();
const log = log4js.getLogger('customersRouter');
log.level = 'trace';

customersRouter.post('/', async (req, res) => {
  log.info('Creates customers request body', req.body);

  try {
    const customerToCreate = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 11),
    };

    const customer = await db.Customer.create(customerToCreate);
    const createCustomerResponse = {
      status: 'ok',
      data: formatCustomer(customer),
    };

    log.trace('Create customer response', createCustomerResponse);

    res.status(201).json(createCustomerResponse);
  } catch (error) {
    log.error('Create customer error', error);

    res.status(error.code || 400).json({
      status: 'error',
      data: { message: error.message || 'Internal error' },
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

    const customers = rawCustomers.map(formatCustomer);
    const getAllCustomersResponse = {
      status: 'ok',
      data: customers,
    };

    log.trace(
      'All customers response',
      JSON.stringify(getAllCustomersResponse),
    );

    res.status(200).json(getAllCustomersResponse);
  } catch (error) {
    log.error('Get all customers error', error);

    res.status(error.code || 400).json({
      status: 'error',
      data: { message: error.message || 'Internal error' },
    });
  }
});

customersRouter.put('/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const updateParams = getUpdateCustomerParams(req.body);

    const [updateResult, updatedCustomer] = await db.Customer.update(
      updateParams,
      {
        where: { id: customerId },
        returning: true,
        raw: true,
      },
    );

    if (updateResult !== 1 || updatedCustomer.length !== 1) {
      throw new Error(`Customer ${customerId} not updated`);
    }
    const formattedCustomer = formatCustomer(updatedCustomer[0]);
    const updatedCustomerResponse = {
      status: 'ok',
      data: formattedCustomer,
    };

    log.trace('Update customer response', updatedCustomerResponse);

    res.status(200).json(updatedCustomerResponse);
  } catch (error) {
    log.error('Update customer error', error);

    res.status(error.code || 400).json({
      status: 'error',
      data: { message: error.message || 'Internal error' },
    });
  }
});

module.exports = { customersRouter };
