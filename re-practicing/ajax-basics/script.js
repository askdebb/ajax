
const textBtn = document.getElementById('text-btn');
const jsonBtn = document.getElementById('json-btn')
const apiBtn = document.getElementById('api-btn')

textBtn.addEventListener('click', xhrAjaxTextProcess);

function xhrAjaxTextProcess() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './data/message.txt', true);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            displayInfo(data);
        }
    }
}

let displayInfo = (data) => {
    let template = `<div>${data}</div>`
    document.getElementById('text-data').innerHTML = template;
}


jsonBtn.addEventListener('click', xhrAjaxJSONProcess);

function xhrAjaxJSONProcess()  {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './data/data.json', true);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            // console.log(data);
            jsonDisplayData(data)
            }
        }
}

let jsonDisplayData = (data) => {
    let jsonTemplate = '';
    for (let jsonData of data) {
      jsonTemplate += `
                        <div class="card mt-2 bg-light">
                            <div class="card-body" >
                                <p class="px-2"><b>Name:</b> ${jsonData.name}  </p>  
                                <p class="px-2"><b>Age:</b> ${jsonData.age}  </p>  
                                <p class="px-2"><b>Gender:</b> ${jsonData.gender}  </p>  
                                <p class="px-2"><b>Interest:</b> ${jsonData.interest}  </p> 
                            </div>
                        </div>
                         
                    `
    }
    document.getElementById('json-data').innerHTML= jsonTemplate;
}

apiBtn.addEventListener('click', xhrAjaxAPIProcess);

function xhrAjaxAPIProcess() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status === 200) {
            let data = xhr.responseText;
            let users = JSON.parse(data)
            // console.log(users);
            apiDisplayInfo(users)
        }
    }
}

let apiDisplayInfo = (usersInfo) => {
    let apiTemplate = '';
    for(let userInfo of usersInfo) {
        apiTemplate += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h4 class="text-center"> <b>${userInfo.name}</b></h4>
                                <ul class="list-group">
                                    <li class="list-group-item">Username: ${userInfo.username}</li>
                                    <li class="list-group-item">Phone No.: ${userInfo.phone}</li>
                                    <li class="list-group-item">Email: ${userInfo.email}</li>
                                    <li class="list-group-item">Website: ${userInfo.website}</li>
                                    <li class="list-group-item">Company Name: ${userInfo.company.name}</li>
                                    <li class="list-group-item">Street Name: ${userInfo.address.street}</li>
                                </ul>
                            </div>
                        </div>
                    
        `
    }
    document.getElementById('api-data').innerHTML = apiTemplate;
}