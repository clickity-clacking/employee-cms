const router = require('express').Router();
const employeeRoutes = require('./employeeRoutes');
const departmentRoutes = require('./departmentRoutes');
const roleRoutes = require('./roleRoutes');

router.use('/readers', readerRoutes);
router.use('/cards', libraryCardRoutes);

module.exports = router;