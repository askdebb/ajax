import { CustomHttpApi } from "./apiCustom/CustomHttpApi.js";

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');
const putBtn = document.getElementById('put-btn');
const deleteBtn = document.getElementById('delete-btn');

const serverURL = `http://127.0.0.1:5000/api`;

// const generateRandomUsers = Math.floor( Math.random() * 3);


function fetchAllUsers() { 
    let allUsers = new CustomHttpApi();
    let url = `${serverURL}/users`;
    allUsers.get(url, (err, users) => {
        if(err) throw err;
        displayUsersInfo(users);
        
    });
} 

// get request
getBtn.addEventListener('click', fetchAllUsers);


// post request
postBtn.addEventListener('click', function () {

    let url = `${serverURL}/users`;
    let user = {
        name: 'Hellen Tucker',
        username: 'Frank ',
        email: 'johndoe@gmail.com',
        gender: 'Female',
        date_of_birth: '1890-01-01'
    }
    let userToSave = new CustomHttpApi();
    userToSave.post(url, user, (err, data) => {
        if(err) throw err;
       alert(JSON.stringify(data));
       fetchAllUsers();
    });
});


// put request
putBtn.addEventListener('click', () => {
    let userID = '8b';
    let url = `${serverURL}/users/${userID}`;
    let userUpdate = {
        name: 'Christopher Tucker',
        username: 'codebolt',
        email: 'johndoe@gmail.com',
        gender: 'Female',
        date_of_birth: '1890-01-01'
    }
    let userUpdater = new CustomHttpApi();
    userUpdater.put(url, userUpdate, (data) => {
        alert(JSON.stringify(data));
        fetchAllUsers();
    });
});


let displayUsersInfo = (users) => {
    let userTemplate = '';
    // randomUsers(users);
    for(let user of users) {
        userTemplate += `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.gender}</td>
                            <td>${user.date_of_birth}</td>
                        </tr>`;
    }
    document.getElementById('table-body').innerHTML = userTemplate;
}



// let randomUsers = (data) => {
//     let usertoDelete = (data[generateRandomUsers]);
//     let userID = usertoDelete.id;
//     console.log('User id to be deleted: ', userID);
    // let url = `${serverURL}/users/${userID}`;

    deleteBtn.addEventListener('click', () => {
        let userID = '8b';
        let url = `${serverURL}/users/${userID}`;
        let userToDelete = new CustomHttpApi();
        userToDelete.delete(url, (data) => {
            alert(JSON.stringify(data));
            fetchAllUsers();
        });
    });
   
// }




