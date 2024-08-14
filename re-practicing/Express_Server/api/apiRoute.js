const express = require('express');
const route = express.Router();
const fs = require('fs');
const path = require('path');

// users Data in database file
const usersDataFile = path.join(__dirname, '../database/users.json');


// generate unique id
let uniqueID = () => {
    return Math.random().toString(36).substr(2,2);
}

let readUsersFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(usersDataFile, 'utf-8', (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                try {
                    resolve(JSON.parse(data));
                } catch (parserErr) {
                    reject(parserErr)
                }
                
            }
        });
    })
}


let writeUserFile = (data) => {
    return new Promise((resolve, reject) => {
        const newData = JSON.stringify(data, null, 2)
        fs.writeFile(usersDataFile, newData, (err) => {
            if(err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}


//get all users
route.get('/users', (req,res) => {
    readUsersFile()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({error: err.message})) ;
    console.log(`GET request received by server...${new Date().toLocaleTimeString()}`);
});


// post a user
route.post('/users', (req,res) => {
    
// read the file into a container called users
    readUsersFile()
    .then((users) => {
        // check if the users container has the right array structure
        // if not make the container an empty array  
        if(!Array.isArray(users)) {
            users = [];
        }
        const userInfo = {
            id: uniqueID(),
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth
        };
        users.push(userInfo);
        writeUserFile(users)
            .then(() => {
                console.log(`POST request received by server...${new Date().toLocaleTimeString()}`);
                res.status(201).json({msg:'POST Request, Successful'});
            })
            .catch(
                (err) => {
                    console.log(`POST request failed...${new Date().toLocaleTimeString()}`);
                    res.status(500).json({error: 'Failed to save user data'});
                }
            )
    })
    .catch((err) => res.status(500).json({error: 'Failed to read the users file from the server'}));
});


// put | update a user
route.put('/users/:id', (req, res) => {

    readUsersFile()
    .then((users) => {
        if(!Array.isArray(users)) {
            users = [];
        }
        const userID = req.params.id;
        console.log("User ID: ",userID);

        let userInfoToUpdateIndex = users.findIndex((thatUser) => {
            return thatUser.id === userID;
        });

        if(userInfoToUpdateIndex === -1) {
            return res.status(400).json({error: "User not found"});
        }
        let updateUserInfo = {
            id: userID,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth
        }
        
        users[userInfoToUpdateIndex] = updateUserInfo;
        // users.splice(userInfoToUpdateIndex, 1, updateUserInfo);
        writeUserFile(users)
        .then(() => {
            console.log(`PUT Request successful at server ... ${new Date().toLocaleTimeString()}`);
            res.json({msg: 'PUT Request successful'});
        })
        .catch(() => {
            console.log(`PUT Request failed at server ... ${new Date().toLocaleTimeString()}`);
            res.status(500).json({error: 'Failed to update user data'});
        });
    })
    .catch((err) => {
        console.log(`Failed to read the users file from the server... ${new Date().toLocaleTimeString()}`);
        res.status(500).json({error: 'Failed to read users file from server'});
    });
});


// delete a user request
route.delete('/users/:id', (req, res) => {
    readUsersFile()
    .then((users) => {
        if(!Array.isArray(users)) {
            users = [];
        }
        let userID = req.params.id;
        users = users.filter((thatUser) => {
            return thatUser.id !== userID;
        });
        writeUserFile(users)
        .then(() => {
            console.log(`DELETE Request successful at server ... ${new Date().toLocaleTimeString()}`);
            res.json({msg: `File deleted successfully.`})
        })
        .catch(() => {
            console.log(`FIle not updated on server after DELETE Request ... ${new Date().toLocaleTimeString()}`);
            res.status(500).json({msg: 'Failed to save the updated file after DELETE Request'})
        })
    })
    .catch((err) => {
        console.log(`DELETE Request failed on server...${new Date().toLocaleTimeString()}`);
        res.status(500).json({error: 'Failed to delete user'})
    })
});


module.exports = route;