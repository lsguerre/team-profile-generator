const employeeCard = team => {
    const members = team.map(data => {
        const role = data.getRole()

        if (role === 'Manager') {
            return managerCard(data)
        } else if (role === 'Engineer') {
            return engineerCard(data)
        } else {
            return internCard(data)
        }
    })
    return members.join('')
}

const managerCard = manager => {
    return `
    <div class="row justify-content-center">
    <div class="col-4 mt-4">
        <div class="card-header">
            <h4>${manager.name}</h4>
            <h5>Manager</h5>
        </div>
        <div class="card-body">
            <p>ID: ${manager.id}</p>
            <p>Email:${manager.email}</p>
            <p>Office Number:${manager.officeNumber}</p>
        </div>
    </div>
</div>`
}

const engineerCard = engineer => {
    return  `
    <div class="row justify-content-center">
    <div class="col-4 mt-4">
        <div class="card-header">
            <h4>${engineer.name}</h4>
            <h5>Engineer</h5>
        </div>
        <div class="card-body">
            <p>ID: ${engineer.name}</p>
            <p>Email:${engineer.name}</p>
            <p>Github:${engineer.github}</p>
        </div>
    </div>
</div>`
}

const internCard = intern => {
    return  `
    <div class="row justify-content-center">
    <div class="col-4 mt-4">
        <div class="card-header">
            <h4>${intern.name}</h4>
            <h5>Intern</h5>
        </div>
        <div class="card-body">
            <p>ID: ${intern.id}</p>
            <p>Email:${intern.email}</p>
            <p>School:${intern.school}</p>
        </div>
    </div>
</div>`
}

module.exports = team => {

return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Team Profile</title>
</head>
<body>
    <header>
        <h1 class="display-4 mx-3">Team Profile</h1>
    </header>
    <div class="container">
        ${employeeCard(team)}
    </div>
</body>
</html>`

}