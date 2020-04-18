const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./resources/logger/logger.service');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
