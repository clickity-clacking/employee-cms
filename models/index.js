const Employee = require('./Employee');
const Department = require('./Department');

Employee.hasOne(Department, {
    foreignKey: 'employee_id',
});
  
Department.belongsTo(Employee, {
foreignKey: 'employee_id'
});

module.exports = { Employee, Department };
