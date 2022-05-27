const router = require('express').Router();
const { Employee, Role, Department } = require('../../models');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employeeData = await Employee.findAll({
      include: [{ model: Employee }, {model: Role}, {model: Department}],
    });
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single employee
router.get('/:id', async (req, res) => {
  try {
    const employeeData = await Employee.findByPk(req.params.id, {
      include: [{ model: Employee }, {model: Role}, {model: Department}],
    });

    if (!employeeData) {
      res.status(404).json({ message: 'No employee found with that id!' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an employee
router.post('/', async (req, res) => {
  try {
    const employeeData = await Employee.create(req.body);
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
