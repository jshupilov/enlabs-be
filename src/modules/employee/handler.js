'use strict';
const Boom = require('@hapi/boom');

exports.handler = {
  async getAllEmployee(request, h) {
    try {
      return await request.getModel('employee').findAll();
    } catch (error) {
      console.log('Can not get all employees', error);
      return Boom.internal();
    }
  },

  async addEmployee(request, h) {
    try {
      const employee = await request.getModel('employee').create(request.payload);
      return employee
    } catch (error) {
      console.log('Can not add employee', error);
      return Boom.internal();
    }
  },
  
  async updateEmployee(request, h) {
    try {
      const [length, [employee]] = await request.getModel('employee').update(request.payload, {
        where: { id: request.payload.id },
        returning: true,
        raw: true,
        planing: true
      });
      if (length) {
        return employee;
      } else {
        return Boom.internal();
      }
    } catch (error) {
      console.log('Can not update employee', error);
      return Boom.internal();
    }
  },

  async removeEmployee(request, h) {
    try {
      const { id } = request.params;
      const result = await request.getModel('employee').destroy({
        where: { id }
      });
      return true;
    } catch (error) {
      console.log('Can not delete employee', error);
      return Boom.internal();
    }
  },
}