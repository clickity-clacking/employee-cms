const inquirer = require('inquirer');

var employeeList = [];
var departmentList = [];
var roleList = [];

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
        message: "What is the department of the role?",
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
        message: "What is the role of the employee?",
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
        message: "Who is the manager of the employee?",
        when: (answers) => answers.action === "add an employee",
        validate: addEmployeeManager => {
            if (addEmployeeManager) {
                return true;
            } else {
                console.log("Please add a manager")
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
    } else if (answers.action === 'view all roles'){
        // presented with the job title, role id, the department that role belongs to, and the salary for that role        
        employeeList.push(newIntern);
    } else{
        // presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        var newManager = new Manager(answers.name,answers.id,answers.email,answers.officeNum)
        employeeList.push(newManager);
    }


    if(answers.more === "Add another team member"){
        init(questions);
    } else {
        console.log(employeeList);
        html = generateHTML(employeeList);
        fs.writeFile("writtenFile.html", html, "utf8", (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
    };

};

// Function call to initialize app
init(questions);

