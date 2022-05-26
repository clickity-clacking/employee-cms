const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      dept_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      edition: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      is_paperback: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      //fk pattern should follow model then _ then primary key name format
      employee_id: {        
        type: DataTypes.INTEGER,
        reference: {
            model:'Employee',
            key:'id'   
          }
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'Department'
    }
  );
  
  module.exports = Department;
  