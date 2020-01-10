const inquirer = require("inquirer");

startInquirer();

function startInquirer(typeOfEmployee){
    inquirer.prompt(questionPrompts(typeOfEmployee)).then(function(res){
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
    ).then(function(choices) {
        if(choices.addOrNot === "yes") {
            whatTypeOfEmployeePrompt();
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
    ).then(function(choices) {
        if(choices.typeOfEmpoyee === "engineer") {
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
            message: `what is your ${typeOfEmployee} name?`,
            name: "name"
        },
        {
            type: "Input",
            message: `what is your ${typeOfEmployee} id?`,
            name: "id"
        },
        {
            type: "Input",
            message: `what is your ${typeOfEmployee} email?`,
            name: "email"
        },
    ];
    
    if(typeOfEmployee === "mananger") {
        promptsArr.push(
            {
                type: "Input",
                message: `what is the managers office location?`,
                name: "dynamicData"
            }
        );
    } else if(typeOfEmployee === "engineer") {
        promptsArr.push(
            {
                type: "Input",
                message: `what is the github url?`,
                name: "dynamicData"
            }
        );
    } else if(typeOfEmployee === "intern") {
        promptsArr.push(
            {
                type: "Input",
                message: `what school are they affilated with?`,
                name: "dynamicData"
            }
        );
    }
    
    buildEmployee(promptsArr, typeOfEmployee);

    return promptsArr
}

function buildEmployee(arr, typeOfEmployee) {

}