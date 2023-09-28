const path = require('node:path');
const fs = require('node:fs');
const log4js = require('log4js');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');

const { app } = require('./server');

const log = log4js.getLogger('main');
log.level = 'debug';

const port = parseInt(process.env.PORT, 10) || 3000;
const file = fs.readFileSync(path.resolve('./src/docs/swagger.yaml'), 'utf-8');
const swaggerDocument = YAML.parse(file);

const options = {
  explorer: false,
};

app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(port, () => {
  log.debug(`Server is up and running on port ${port}`);
});
