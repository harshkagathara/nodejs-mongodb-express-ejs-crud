var express = require('express');
var router = express.Router();
var employee = require("../Controllers/Employee.controller");
router.get('/', employee.list)
router.get('/show/:id', employee.show)
router.get('/create', employee.create)
router.post('/save', employee.save)
router.get('/edit/:id', employee.edit)
router.post('/update/:id', employee.update)
router.post('/delete/:id', employee.delete)
module.exports = router;