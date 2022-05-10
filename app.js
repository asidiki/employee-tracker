// const express = require ('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//connect DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kalamazoo1!',
    database: 'employees_db'
});

connection.connect(function(err){
    if (err) throw err;
    init();
})


// // route GET 
// app.get('/api/employees', (req, res) => {
//     const sql = `SELECT * FROM employee`;
//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });



// // Start server after DB connection
// db.connect(err => {
//     if (err) throw err;
//         console.log('Database connected.');
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//     });
// });


function init() {
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'EXIT'
        ]
    }).then(function (answer){
        switch (answer.choice) {
            case 'View all departments':
                viewAllDepts();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmps();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp();
                break;
            case 'Update an employee role':
                updateEmpRole();
                break;
            case 'EXIT':
                exitApp();
                break;
            default:
                break;
        }
    })
};

//view all deprtments
function viewAllDepts() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res){
        if(err) throw err;
        console.table('All Departments:',res);
        init();
    })
};

//view all roles
function viewAllRoles (){
    var query = 'SELECT * FROM role';
    connection.query(query, function(err,res){
        if(err) throw err;
        console.table("All Roles:",res);
        init();
    })
};

function viewAllEmps (){
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err,res){
        if(err) throw err;
        console.table("All Employees:",res);
        init();
    })
};

function addDept (){
    inquirer.prompt([
        {
            name: 'newDept',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]).then(function (entry){
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: entry.newDept
            }
        );

        var query = 'SELECT * FROM department';
        connection.query(query, function(err,res){
            if(err) throw err;
            console.log('Department has been added')
            console.table("All departments:",res);
            init();
        })
    })
};

function addRole (){
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer.prompt([
            {
                name: 'newRole',
                type: 'input', 
                message: "Enter name of new role?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (entry) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == entry.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: entry.newRole,
                    salary: entry.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('New role has been added!');
                    init();
                })
        })
    })
};

function addEmp() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(val)
            init()
        })

    })
};


function updateEmpRole() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
        
        if (err) throw err;
        console.log(res);
        inquirer.prompt([
            {
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name? ",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the Employees new title? ",
                choices: selectRole()
            }
        ]).then(function(val){
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
            {
            last_name: val.lastName
            }, 
            {
            role_id: roleId
            }, 
            function(err){
                if (err) throw err;
                console.log('Employee role updates');
                init();
            })
        });
    });
};









//callbacks
var roleArray = [];
function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        };

    });
    return roleArray;
};


var managersArray = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        managersArray.push(res[i].first_name);
        };

    });
    return managersArray;
};



function exitApp (){
    connection.end();
}