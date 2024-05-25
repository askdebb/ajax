const express = require('express');
const router = express.Router();

// employees Data
let employees = [
    {
        id : '_abcdef',
        first_name : 'John',
        last_name : 'Wilson',
        email : 'chri@k.com',
        gender : 'Male',
        ip_address : '127.0.0.1',
    },
    {
        id : '_vwxyz',
        first_name : 'Laura',
        last_name : 'Maggie',
        email : 'madam@hornam.com',
        gender : 'Female',
        ip_address : '192.168.0.1',
    },
]

// Create ID
let getID = () => {
    return '_' + Math.random().toString(36).substr(2,9);
};


// GET - Employees

router.get('/employees', (request, response) => {
    console.log(`GET Request Received at server .. ${new Date().toLocaleTimeString()}`);
    response.json(employees);
});

// POST Request - Employee
router.post('/employees', (request, response) => {
    let employee = {
        id: getID(),
        first_name : request.body.first_name,
        last_name : request.body.last_name,
        email : request.body.email,
        gender : request.body.gender,
        ip_address : request.body.ip_address,
    };

    employees.push(employee);
    console.log(`POST Request Received at server .. ${new Date().toLocaleTimeString()}`);
    response.json({msg : 'POST Request is Successful'});
});


// PUT - Request - Employee

router.put('/employees/:id', (request, response) => {
    let empID = request.params.id;
    let updateEmployee = {
        id: empID,
        first_name : request.body.first_name,
        last_name : request.body.last_name,
        email : request.body.email,
        gender : request.body.gender,
        ip_address : request.body.ip_address,

    };

    // get existing employee's ID to perform update
    let exisitngEmployee = employees.find((employee) => {
        return employee.id === empID;
    });

    // update the employee with the details
    employees.splice(employees.indexOf(exisitngEmployee), 1, updateEmployee);
    console.log(`PUT Request Received at server .. ${new Date().toLocaleTimeString()}`);
    response.json({msg : 'PUT Request is Successful'});
});


// Delete Request - Delete employee

router.delete('/employees/:id', (request, response) => {
    let empId = request.params.id;
    employees = employees.filter((employee) => {
        return employee.id !== empId;
    });
    console.log(`DELETE Request Received at server .. ${new Date().toLocaleTimeString()}`);
    response.json({msg : 'DELETE Request is Successful'});
});



module.exports = router;