const mongoose = require('mongoose');
const debug = require('debug')('portfolio-server:db');

const { DB_URI_MONGO_ATLAS } = process.env;

mongoose
  .connect(DB_URI_MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => debug(`Connected to DB: Mongo Atlas`))
  .catch((err) => {
    debug(
      `There was an error when trying to connect to the database: ${DB_URI_MONGO_ATLAS}`
    );
    debug(err);
  });
