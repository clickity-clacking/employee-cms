const router = require('express').Router();
const { Employee, Role, Department } = require('../../models');

// GET all Roles
router.get('/', async (req, res) => {
  try {
    const roleData = await Role.findAll({
      include: [{ model: Employee }, {model: Role}, {model: Department}],
    });
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a Department
router.post('/', async (req, res) => {
    try {
      const roleData = await Role.create(req.body);
      res.status(200).json(roleData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  module.exports = router;