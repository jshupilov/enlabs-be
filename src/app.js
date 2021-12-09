'use strict';
const Hapi = require('@hapi/hapi');
const Sequelize = require('sequelize');
const config = require('./config');

const start = async () => {
  //Server initialization
  const server = new Hapi.Server(config.server);

  // Register extention
  const modulesToLoad = [
    {
      plugin: require('hapi-sequelizejs'),
      options: [{
        name: config.db.database,
        models: [__dirname + '/models/*.js'], // Path to models
        sequelize: new Sequelize(config.db.url, {
          dialect: 'postgres',
          logging: console.log,
          define: {
            createdAt: 'created_at',
            updetedAt: 'updated_at',
            freezeTableName: true,
            timestamps: true,
            underscored: true,
          },
          dialectOptions: config.db.dialectOptions
        }),
        sync: true,
        forceSync: false, // if true, then tables will drop before synchronization 
      }]
    }, {
      plugin: require('./modules/employee/module').plugin,
      options: {}
    }, {
      plugin: require('hapi-cors'),
      options: {
        origins: ['*'],
        allowCredentials: 'true',
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
        exposeHeaders: ['content-type', 'content-length', 'accept', "Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
        maxAge: 600,
        headers: ['Origin', 'Cookie', 'Accept', 'Authorization', 'X-Requested-With', 'Content-Type', 'Access-Control-Request-Method', 'Access-Control-Request-Headers']
      }
    }
  ];
  await server.register(modulesToLoad, {
    routes: {
      prefix: '/v1',
    },
  });

  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.log('SERVER START ERROR', error);
  }
  return server;
};

exports.start = start;