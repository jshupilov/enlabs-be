const Joi = require('@hapi/joi');
const { handler } = require('./handler');

const plugin = {
  name: 'Employee',
  version: '1.0.0',
  register: async (server, options) => {
    console.log('Plugin EMPLOYEE registered')

    server.route({
      method: 'GET',
      path: '/employee/all',
      options: {
        auth: false
      },
      handler: handler.getAllEmployee
    });

    server.route({
      method: 'POST',
      path: '/employee',
      options: {
        validate: {
          payload: Joi.object({
            first_name: Joi.string().min(1).required(),
            last_name: Joi.string().min(1).required(),
            email: Joi.string().email().required(),
            office: Joi.string().min(2).required(),
            dob: Joi.date().required(),
            phone_number: Joi.string().min(1).required(),
            tags: Joi.array().items(Joi.string()).optional()
          }),
          failAction: 'log'
        },
        auth: false
      },
      handler: handler.addEmployee
    });

    server.route({
      method: 'PUT',
      path: '/employee',
      options: {
        validate: {
          payload: Joi.object({
            id: Joi.number().positive().required(),
            first_name: Joi.string().min(1).required(),
            last_name: Joi.string().min(1).required(),
            email: Joi.string().email().required(),
            dob: Joi.date().required(),
            office: Joi.string().min(2).required(),
            phone_number: Joi.string().min(1).required(),
            tags: Joi.array().items(Joi.string()).optional()
          }),
          failAction: 'log'
        },
        auth: false
      },
      handler: handler.updateEmployee
    });

    server.route({
      method: 'DELETE',
      path: '/employee/{id}',
      options: {
        validate: {
          params: Joi.object({
            id: Joi.number().positive().required()
          }),
        },
        auth: false
      },
      handler: handler.removeEmployee
    });

  }
}

exports.plugin = plugin;