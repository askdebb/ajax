import { CustomHttpApi }  from "./apiCustom/customHttpApi.js";

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');
const putBtn = document.getElementById('put-btn');
const deleteBtn = document.getElementById('delete-btn');

const serverURL = `http://127.0.0.1:5000/api`;

// function fetchAllUsers() { 
//     let allUsers = new CustomHttpApi();
//     let url = `${serverURL}/users`;
//     allUsers.get(url, (err, users) => {
//         if(err) {
//             console.log(err);
//             return;
//         } else {
//             console.log("Fetched Users:", users);
//             displayUsersInfo(users);  
//         } 
//     });
// } 

// let displayUsersInfo = (users) => {
//     let userTemplate = '';
//     for(let user of users) {
//         userTemplate += `<tr>
//                             <td>${user.id}</td>
//                             <td>${user.name}</td>
//                             <td>${user.username}</td>
//                             <td>${user.email}</td>
//                             <td>${user.gender}</td>
//                             <td>${user.date_of_birth}</td>
//                         </tr>`;
//     }
//     document.getElementById("table-body").innerHTML = userTemplate;
// }

function fetchAllUsers() {
    let url = `${serverURL}/users`;
    let userFetcher = new CustomHttpApi();
    userFetcher.get(url, (err, users) => {
        if (err) {
            return console.log(err);
        }
        // Assuming you are updating the DOM here without reloading the page
        let output = '';
        users.forEach(user => {
            output += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.gender}</td>
                    <td>${user.date_of_birth}</td>
                </tr>`;
        });
        document.querySelector('table tbody').innerHTML = output;
    });
}


// get request
getBtn.addEventListener('click', 
     function (e) {
    e.preventDefault();
    fetchAllUsers();
    console.log("GET button clicked");
}
);


// POST request handler
postBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("POST button clicked");

    let url = `${serverURL}/users`;
    let user = {
        name: 'Debrah Sraha',
        username: 'Adzamadi ',
        email: 'j@gmail.com',
        gender: 'Mmale',
        date_of_birth: '1800-11-21'
    };

    let userToSave = new CustomHttpApi();
    userToSave.post(url, user, (err, data) => {
        if (err) {
            console.error("POST request error:", err);
            return;
        }
        else {
            console.log("POST response data:", data);
            alert(JSON.stringify(data.msg));
            fetchAllUsers();
        };
    });
});


// put request
putBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let userID = '90p';
    let url = `${serverURL}/users/${userID}`;
    let userUpdate = {
        name: 'Christopher Tucker',
        username: 'codebolt',
        email: 'johndoe@gmail.com',
        gender: 'Female',
        date_of_birth: '1890-01-01'
    }
    let userUpdater = new CustomHttpApi();
    userUpdater.put(url, userUpdate, (err, data) => {
        if (err) {
            console.error(err);
            alert(JSON.stringify(data));
            return;
        }
        alert(JSON.stringify(data));
        fetchAllUsers();
    });
});




deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let userID = 'nh';
    let url = `${serverURL}/users/${userID}`;
    let userToDelete = new CustomHttpApi();
    userToDelete.delete(url, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
        fetchAllUsers();
        alert(JSON.stringify(data));
        
    });
});




