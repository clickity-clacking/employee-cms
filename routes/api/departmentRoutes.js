const router = require('express').Router();
const { Employee, Role, Department } = require('../../models');

// GET all Departments
router.get('/', async (req, res) => {
  try {
    const departmentData = await Department.findAll({
      include: [{ model: Employee }, {model: Role}, {model: Department}],
    });
    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a Department
router.post('/', async (req, res) => {
    try {
      const departmentData = await Department.create(req.body);
      res.status(200).json(departmentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  module.exports = router;