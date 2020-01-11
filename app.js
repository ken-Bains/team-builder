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


function buildEmployee(arr) {
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
    allEmployeesArr = employeesArr;
    console.log(allEmployeesArr, "114")
    addToHtml();
}

async function addToHtml() {
    const readFile = util.promisify(fs.readFile);
    // const appendFile = util.promisify(fs.appendFile);
    let htmlNodes = '';

    let engineerHtml = await readFile(__dirname + "/templates/engineer.html", "utf8");
    let manangerHtml = await readFile(__dirname + "/templates/manager.html", "utf8");
    let internHtml = await readFile(__dirname + "/templates/intern.html", "utf8");

    allEmployeesArr.forEach(el => {
        let template;
        let employeeRole = el.getRole();

        if(employeeRole === "Manager") {
            template = manangerHtml;
        } else if(employeeRole === "Engineer") {
            template = engineerHtml;
        } else {
            template = internHtml;
        }

        let node = replaceWithData(el, template);
        htmlNodes += node;
    })

    function replaceWithData(data_bit, template) {
        var html_snippet, prop, regex;

        for (prop in data_bit) {
            regex = new RegExp('{{' + prop + '}}', 'ig');
            html_snippet = (html_snippet || template).replace(regex, data_bit[prop]);
        }
        regex = new RegExp('{{role}}', 'ig');
        html_snippet = (html_snippet || template).replace(regex, data_bit.getRole());
        return html_snippet;
    }
    fs.appendFile(__dirname + "/templates/main.html", htmlNodes, (err, data) => {if(err) throw err});
    generateOutputHtml();
}

async function generateOutputHtml() {
    const readFile = util.promisify(fs.readFile);
    let allEmployeesHtml = await readFile(__dirname + "/templates/main.html", "utf8");
    console.log(allEmployeesHtml);
    let teamHtml = `
    <!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Team</title>
  </head>
  <body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4 text-center">My Team</h1>
  </div>
</div>
<div class="container">
  <div class="card-columns">
    ${allEmployeesHtml}
</div>
</div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>`

    fs.writeFile(__dirname + "/output/team.html", teamHtml, (err, data) => {if (err) throw err})
    fs.writeFile(__dirname + "/templates/main.html", "", (err, data) => {if (err) throw err})


}