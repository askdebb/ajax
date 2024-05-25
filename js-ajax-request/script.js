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
