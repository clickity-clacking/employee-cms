const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      job_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {        
        type: DataTypes.STRING,
        allowNull: false
      },
      salary: {
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
      modelName: 'Role'
    }
);
  
module.exports = Role;
  