const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
var allEmployeesArr = [];

startInquirer();

function startInquirer(typeOfEmployee) {
    inquirer.prompt(questionPrompts(typeOfEmployee)).then(function (res) {
        allEmployeesArr.push(res);
        addEmployeePrompt()
    });
}

function addEmployeePrompt() {
    inquirer.prompt(
        {
            type: "list",
            message: `do you want to add antother employee?`,
            name: "addOrNot",
            choices: ["yes", "no"]
        }
    ).then(function (choices) {
        if (choices.addOrNot === "yes") {
            whatTypeOfEmployeePrompt();
        } else if (choices.addOrNot === "no") {
            buildEmployee(allEmployeesArr);

        }
    })
}

function whatTypeOfEmployeePrompt() {
    inquirer.prompt(
        {
            type: "list",
            message: `what type of employee do you want to add?`,
            name: "typeOfEmpoyee",
            choices: ["engineer", "intern"]
        }
    ).then(function (choices) {
        if (choices.typeOfEmpoyee === "engineer") {
            startInquirer("engineer");
        } else {
            startInquirer("intern");
        }
    })
}

function questionPrompts(typeOfEmployee = "mananger") {
    var promptsArr = [
        {
            type: "Input",
            message: `what is the ${typeOfEmployee}'s name?`,
            name: "name"
        },
        {
            type: "Input",
            message: `what is the ${typeOfEmployee}'s id?`,
            name: "id"
        },
        {
            type: "Input",
            message: `what is the ${typeOfEmployee}'s email?`,
            name: "email"
        },
    ];

    if (typeOfEmployee === "mananger") {
        promptsArr.push(
            {
                type: "Input",
                message: `what is the managers office location?`,
                name: "office"
            }
        );
    } else if (typeOfEmployee === "engineer") {
        promptsArr.push(
            {
                type: "Input",
                message: `what is the github user name?`,
                name: "github"
            }
        );
    } else if (typeOfEmployee === "intern") {
        promptsArr.push(
            {
                type: "Input",
                message: `what school are they affilated with?`,
                name: "school"
            }
        );
    };

    return promptsArr
}


async function buildEmployee(arr) {
    const readFile = util.promisify(fs.readFile);
    // const maps = util.promisify(stripe.map);

    let engineerHtml = await readFile(__dirname + "/templates/engineer.html", "utf8");
    let manangerHtml = await readFile(__dirname + "/templates/manager.html", "utf8");
    let internHtml = await readFile(__dirname + "/templates/intern.html", "utf8");

    let employeesArr = arr.map(el => {
        if(el.school) {
            var newObj = new Intern(el.name, el.id, el.email, el.school)
        } else if (el.github) {
            var newObj = new Engineer(el.name, el.id, el.email, el.github)
        } else {
            var newObj = new Manager(el.name, el.id, el.email, el.office)
        }
        return newObj
    });

    
}