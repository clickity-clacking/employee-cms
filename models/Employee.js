const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      f_name: {
        type: DataTypes.STRING
      },
      l_name: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING,
        reference: {
            model:'Role',
            key:'id'   
          }
      },
      role_salary: {
        type: DataTypes.INTEGER,
        reference: {
            model:'Role',
            key:'id'   
          }
      },
      manager: {
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'Employee'
    }
  );
  
  module.exports = Employee;
  