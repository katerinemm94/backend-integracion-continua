module.exports = {
  apps : [{
    name: 'backend-integracion-continua',
    script: './app.js',
    instances: 1,
    env: {
      NODE_ENV: 'development'
    },
    env_test: {
      NODE_ENV: 'test'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
