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
    }
];

function makeObject(name, role, id, email, github, more) {
    return new employee(name, role, id, email, github, more);
};

// TODO: Create a function to initialize app
async function init(questions) {
    const answers = await inquirer.prompt(questions);
    if (answers.role === 'Engineer'){
        var newEng = new Engineer(answers.name,answers.id,answers.email,answers.github);
        employeeList.push(newEng);
    } else if (answers.role==="Intern"){
        var newIntern = new Intern(answers.name,answers.id,answers.email,answers.school)
        employeeList.push(newIntern);
    } else{
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

