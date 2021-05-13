var Employee = require("../Models/Employee");
exports.list = function(req, res) {
	Employee.find({}).exec(function(err, employees) {
		if(err) {
			console.log("Error:", err);
		} else {
			res.render("../views/employees/index", {
				employees: employees
			});
		}
	});
};
// Show employee by id
exports.show = function(req, res) {
	Employee.findOne({
		_id: req.params.id
	}).exec(function(err, employee) {
		if(err) {
			console.log("Error:", err);
		} else {
			res.render("../views/employees/show", {
				employee: employee
			});
		}
	});
};
// Create new employee
exports.create = function(req, res) {
	res.render("../views/employees/create");
};
// Save new employee
exports.save = function(req, res) {
	var employee = new Employee(req.body);
	employee.save(function(err) {
		if(err) {
			console.log(err);
			res.render("../views/employees/create");
		} else {
			console.log("Successfully created an employee.");
			res.redirect("/employees/show/" + employee._id);
		}
	});
};
// Edit an employee
exports.edit = function(req, res) {
	Employee.findOne({
		_id: req.params.id
	}).exec(function(err, employee) {
		if(err) {
			console.log("Error:", err);
		} else {
			res.render("../views/employees/edit", {
				employee: employee
			});
		}
	});
};
// Update an employee
exports.update = function(req, res) {
	if(!isNaN(req.body.salary)) {
		Employee.findByIdAndUpdate(req.params.id, {
			$set: {
				name: req.body.name,
				address: req.body.address,
				position: req.body.position,
				salary: req.body.salary
			}
		}, {
			new: true
		}, function(err, employee) {
			if(err) {
				console.log(err);
				res.render("../views/employees/edit", {
					employee: req.body
				});
			}
			res.redirect("/employees/show/" + employee._id);
		});
	} else {
		console.log("Salary is not Number")
		res.redirect("/employees/edit/" + req.params.id);
	}
};
// Delete an employee
exports.delete = function(req, res) {
	Employee.remove({
		_id: req.params.id
	}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("Employee deleted!");
			res.redirect("/employees");
		}
	});
};
module.exports = exports;
