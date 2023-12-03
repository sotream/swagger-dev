const getUpdateCustomerParams = (data) => {
  // eslint-disable-next-line object-curly-newline
  const updateParams = {};

  if (!data || Array.isArray(data) || typeof data !== 'object') {
    throw new Error('Data should an object type');
  }

  if (typeof data.name === 'string') {
    updateParams.name = data.name;
  }

  if (typeof data.email === 'string') {
    updateParams.email = data.email;
  }

  return updateParams;
};

const formatCustomer = (data) => {
  const { id, name, email, createdAt, updatedAt } = data;

  return {
    id,
    name,
    email,
    created: createdAt,
    updated: updatedAt,
  };
};

module.exports = {
  formatCustomer,
  getUpdateCustomerParams,
};
