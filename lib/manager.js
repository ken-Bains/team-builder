const Employee = require("./employee.js");

class Manager extends Employee {
    constructor(name, id, email, office) {
        super(name, id, email);
        this.office = office;
    }

    getOfficeNumber() {
        return this.office;
    }

    getRole() {
        return this.constructor.name;
    }

}

module.exports = Manager;