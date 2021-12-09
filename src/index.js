'use strict'

function start() {
  const app = require('./app');
  app.start();
}

start();

process.on('unhandledRejection', (error) => {
  console.log('UNHANDLED REJECTION ERROR', error);
  process.exit(1);
});
