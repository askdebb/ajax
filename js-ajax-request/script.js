const textButton = document.getElementById('text-btn');

textButton.addEventListener('click', () => {
    
    //create ajax request

    let xhr = new XMLHttpRequest();


    // prepare request
    xhr.open('GET', './data/message.txt', true);


    // send request
    xhr.send();


    // process the request

    xhr.onload = () => {
        if(xhr.status === 200) {
            let data = xhr.responseText;
            displayTextData(data);
        }
    } 
});

//display TextData

let displayTextData = (data) => {
    let htmlTemplate = `<h3>${data}</h3>`;
    document.getElementById('text-card').innerHTML = htmlTemplate;
};

// JSON Button

let jsonButton = document.querySelector('#json-btn');
jsonButton.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './data/mobiles.json', true);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status === 200) {
            let jsonString = xhr.responseText;
            let jsonObject = JSON.parse(jsonString)
            displayJSONData(jsonObject)
        }
    }
});

// display JSON Data
let displayJSONData = (jsonObject) => {
    let jsonTemplate = '';
    jsonTemplate = `<ul class="list-group">
                        <li class="list-group-item">ID: ${jsonObject.id}</li>
                        <li class="list-group-item">BRAND: ${jsonObject.brand}</li>
                        <li class="list-group-item">cOLOR: ${jsonObject.color}</li>
                        <li class="list-group-item">PRICE: ${jsonObject.price}</li>
                    </ul>`;

    document.getElementById('json-card').innerHTML = jsonTemplate;
}

// API Button
let apiButton = document.getElementById('api-btn');

apiButton.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status === 200) {
            let apiJSONData = xhr.responseText;
            let apiJSONObject = JSON.parse(apiJSONData)
            displayUsers(apiJSONObject);
        }
    }
});

// display JSON

let displayUsers = (apiJSONObject) => {
    let apiHtmlTemplate = '';
    for(let user of apiJSONObject) {
        apiHtmlTemplate += `<ul class="list-group mb-3">
                                <li class="list-group-item"><b>ID:</b> ${user.id}</li>
                                <li class="list-group-item"><b>NAME:</b> ${user.name}</li>
                                <li class="list-group-item"><b>USERNAME:</b> ${user.username}</li>
                                <li class="list-group-item"><b>STREET:</b> ${user.address.street}</li>
                                <li class="list-group-item"><b>SUITE:</b> ${user.address.suite}</li>
                                <li class="list-group-item"><b>CITY:</b> ${user.address.city}</li>
                                <li class="list-group-item"><b>ZIP CODE:</b> ${user.address.zipcode}</li>
                                <li class="list-group-item"><b>COMPANY NAME:</b> ${user.company.name}</li>
                                <li class="list-group-item"><b>COMPANY CATCHPHRASE:</b> ${user.company.catchPhrase}</li>
                                <li class="list-group-item"><b>COMPANY BS:</b> ${user.company.bs}</li>
                                <li class="list-group-item"><b>EMAIL:</b> ${user.email}</li>
                                <li class="list-group-item"><b>PHONE:</b> ${user.phone}</li>
                                <li class="list-group-item"><b>WEBSITE:</b> ${user.website}</li>
                            </ul> `;

        document.getElementById('api-card').innerHTML = apiHtmlTemplate;
    }
};