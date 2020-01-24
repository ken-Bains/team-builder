# team-builder

## Summary 
This app is a practice in building a team builder using Node JS CLI and also unit test. The app allows you to enter employees and create a team. Once the team a built it generats a html with those members showing their information. This is accomplished by grabbing differnt html templates generating the entered information into them, then compiling all those templates into a new html file showing all team members added. 


## Technologies Used
- HTML - used to create elements on the DOM
- CSS - styles html elements on page
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages
- Bootstrap - front-end framework used to create modern websites and web apps.
- Node JS - An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.

## Demo of dynamically built html
![Site](/assets/team_builder.mp4)

## Code Snippet from node
```javascript
    function buildEmployee(arr) {
        let employeesArr = arr.map(el => {
            if(el.school) {
                var newObj = new Intern(el.name, el.id, el.email, el.school)
            } else if (el.github) {
                var newObj = new Engineer(el.name, el.id, el.email, el.github)
            } else {
                var newObj = new Manager(el.name, el.id, el.email, el.officeNumber)
            }
            return newObj
        });
        allEmployeesArr = employeesArr;
        addToHtml();
    }

```

## Demo of dynamically built html
![Site](/assets/jests.png)


- The code snippit above shows how each employees information was inserted into an html template.
## Code Snippet from Jest
```javascript
    test("Can instantiate Employee instance", () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
    });

    test("Can set name via constructor arguments", () => {
    const name = "Alice";
    const e = new Employee(name);
    expect(e.name).toBe(name);
    });

    test("Can set id via constructor argument", () => {
    const testValue = 100;
    const e = new Employee("Foo", testValue);
    expect(e.id).toBe(testValue);
    });

    test("Can set email via constructor argument", () => {
    const testValue = "test@test.com";
    const e = new Employee("Foo", 1, testValue);
    expect(e.email).toBe(testValue);
    });
```
- The code snippit above shows one of the Jest test performed.


## Author Links
[LinkedIn](https://www.linkedin.com/in/ken-bains)
[GitHub](https://github.com/ken-Bains)
