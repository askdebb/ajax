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
}
