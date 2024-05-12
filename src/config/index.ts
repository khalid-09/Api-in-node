import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.stage || 'local';

let envConfig;

if (stage === 'production') {
  envConfig = require('./prod').default;
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

export default merge(
  {
    stage,
    port: 3001,
    env: process.env.NODE_ENV,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbURL: process.env.DATABASE_URL,
    },
  },
  envConfig
);
