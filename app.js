const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD  
});



const questions = [
    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    {
        type: 'list',
        name: 'action',
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    },
    {
        type: 'input',
        name: 'addDepartment',
        message: "What is the name of the department?",
        when: (answers) => answers.action === "add a department",
        validate: addDepartment => {
            if (addDepartment) {
                return true;
            } else {
                console.log("Please enter a department")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addRoleName',
        message: "What is the name of the role?",
        when: (answers) => answers.action === "add a role",
        validate: addRoleName => {
            if (addRoleName) {
                return true;
            } else {
                console.log("Please enter a role")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addRoleSalary',
        message: "What is the salary of the role?",
        when: (answers) => answers.action === "add a role",
        validate: addRoleSalary => {
            if (addRoleSalary) {
                return true;
            } else {
                console.log("Please enter a salary")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addRoleDepartment',
        message: "What is the department id of the role?",
        when: (answers) => answers.action === "add a role",
        validate: addRoleDepartment => {
            if (addRoleDepartment) {
                return true;
            } else {
                console.log("Please enter a department")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmployeeFn',
        message: "What is the first name of the employee?",
        when: (answers) => answers.action === "add an employee",
        validate: addEmployeeFn => {
            if (addEmployeeFn) {
                return true;
            } else {
                console.log("Please add a first name")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmployeeLn',
        message: "What is the last name of the employee?",
        when: (answers) => answers.action === "add an employee",
        validate: addEmployeeLn => {
            if (addEmployeeLn) {
                return true;
            } else {
                console.log("Please add a last name")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmployeeRole',
        message: "What is the employee's role?",
        when: (answers) => answers.action === "add an employee",
        validate: addEmployeeRole => {
            if (addEmployeeRole) {
                return true;
            } else {
                console.log("Please add a role")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmployeeManager',
        message: "Who is the employee's manager?",
        when: (answers) => answers.action === "add an employee"
    },
    {
        type: 'input',
        name: 'updateEmployeeId',
        message: "What is the id of the employee you'd like to update?",
        when: (answers) => answers.action === "update an employee role",
        validate: updateEmployeeId => {
            if (updateEmployeeId) {
                return true;
            } else {
                console.log("Please specify an employee")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'updateEmployeeRole',
        message: "What role id would you like to update the employee to?",
        when: (answers) => answers.action === "update an employee role",
        validate: updateEmployeeId => {
            if (updateEmployeeId) {
                return true;
            } else {
                console.log("Please specify a role id")
                return false;
            }
        }
    }
];

// TODO: Create a function to initialize app
async function init(questions) {
    const answers = await inquirer.prompt(questions);
    if (answers.action === 'view all departments'){
        // presented with a formatted table showing department names and department ids
        displayDepartments();
    } else if (answers.action === 'view all roles'){
        // presented with the job title, role id, the department that role belongs to, and the salary for that role    
        displayRoles();    
    } else if (answers.action === 'view employees'){
        // presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        displayEmployees();
    } else if (answers.action === 'add a department'){
        addDepartment(answers);
    } else if (answers.action === 'add a role'){
        addRole(answers);
    } else if (answers.action === 'add an employee'){
        addEmployee(answers);
    } else if (answers.action === 'update an employee role'){
        updateEmployee();
    }
};


function displayDepartments() {
    // simple query
    connection.query(
        'SELECT * FROM `departments`',
        function(err, result) {
            console.table(result); // results contains rows returned by server
            init(questions);
        }
    );
};


function displayRoles() {
    // simple query
    connection.query(
        'SELECT * FROM `roles`',
        function(err, result) {
            console.table(result); // results contains rows returned by server
            init(questions);
        }
    );
};

function displayEmployees() {
    // simple query
    connection.query(
        'SELECT * FROM `employees`',
        function(err, result) {
            console.table(result); // results contains rows returned by server
            init(questions);
        }
    );
};

function addDepartment(answers) {
    // simple query
    connection.query(
        "INSERT INTO departments (name) VALUES (?)", [answers.addDepartment],
        function(err, result) {
            init(questions);
        }
    );
};

function addRole(answers) {
    // simple query
    connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answers.addRoleName, answers.addRoleSalary, answers.addRoleDepartment],
        function(err, result) {
            init(questions);
        }
    );
};

function addEmployee(answers) {
    // simple query
    connection.query(
        "INSERT INTO employees (first_name, last_name, role_name, manager_name) VALUES (?, ?, ?, ?)", [answers.addEmployeeFn, answers.addEmployeeLn, answers.addEmployeeRole, answers.addEmployeeManager],
        function(err, result) {
            init(questions);
        }
    );
};



connection.connect(
    console.log(connection.id),
    init(questions)
);