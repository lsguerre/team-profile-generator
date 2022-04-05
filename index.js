const inquirer = require('inquirer')
const fs = require('fs')
const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const generateHTML = require('./src/generateHTML')
const team = []

//prompts

const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team managers name?',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Manager name is required')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the team managers ID?',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter manager ID')
                    return false
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the team managers email?',

        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the team managers office number?',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter manager office number')
                    return false
                } else {
                    return true
                }
            }
        },
        
    ])
    .then(managerInput => {
        const { name, id, email, officeNumber } = managerInput
        const manager = new Manager (name, id, email, officeNumber)

        team.push(manager)
        console.log(manager)
    })

}

const employeePrompt = () => {
    console.log('Add employees to team')
    
    return inquirer.prompt([
     {
         type: 'list',
         name: 'role',
         message: 'What is the employees role?',
         choices: ['Engineer', 'Intern']
     },

        {
            type: 'input',
            name: 'name',
            message: 'What is the employees name?',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Employee name is required')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employees ID?',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter Employee ID')
                    return false
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email?',

        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the employees github?',
            when: (input) => input.role === 'Engineer',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Employee github is required')
                    return false
                }
            }

        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the employees school?',
            when: (input) => input.role === 'Intern',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Employee school is required')
                    return false
                }
            }

        },
        {
            type: 'confirm',
            name: 'confirmEmployee',
            message: 'Add more employees to the team?',
            default:'true'
        }
    ])
    .then(employees => {
        let { name, id, email, role, github, school, confirmEmployee } = employees
        let teamMember
        
        if (role === 'Engineer') {
            teamMember = new Engineer(name, id, email, github)
        } else if (role === 'Intern') {
            teamMember = new Intern(name, id, email, school)
        }

        team.push(teamMember)

        if (confirmEmployee) {
            return employeePrompt(team)
        } else {
            return team
        }
    })
}

const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if(err) {
                reject(err)
                return
            }
            resolve({
                ok: true,
                message: 'File created, check index.html'
            })
        })
    })
}

promptManager()
    .then(employeePrompt)
    .then(team => {
        return generateHTML(team)
    })
    .then(page => {
        return writeToFile(page)
    })
    .catch(err => {
        console.log(err)
    })

    