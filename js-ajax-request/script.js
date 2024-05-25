const textButton = document.getElementById('text-btn');

textButton.addEventListener('click', () => {
    
    //create ajax request

    let xhr = new XMLHttpRequest();


    // prepare request
    xhr.open('GET', './data/message.txt', true);


    // send request
    xhr.send()


    // process request


});