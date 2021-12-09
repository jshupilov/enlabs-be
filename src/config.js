require('dotenv').config();

module.exports = {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    debug: {
      log: ['error']
    }
  },
  db: {
    database: process.env.DATABASE,
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: false,
      keepAlive: true,
    }

  }
}