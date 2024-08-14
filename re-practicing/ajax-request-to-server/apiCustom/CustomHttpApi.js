export class CustomHttpApi {
    constructor() {
        this.apiReqs = new XMLHttpRequest();
    }

    // GET Request

    get = (URL, callback) => {
        this.apiReqs.open('GET', URL, true);
        // this.apiReqs.send();
        this.apiReqs.onload =() => {
            if(this.apiReqs.status === 200) {
                let data = this.apiReqs.responseText;
                let users = JSON.parse(data);
                console.log(users);
                callback(null,users);
            }
            else {
                callback(`Error : ${this.apiReqs.status}`);
            }
        };
        this.apiReqs.onerror = () => callback("Request failed");
        this.apiReqs.send();
    };

    // POST method

    post = (URL, user, callback) => {
        this.apiReqs.open('POST', URL, true);
        this.apiReqs.setRequestHeader('Content-Type', 'application/json');
        this.apiReqs.onload = () => {
            if (this.apiReqs.status === 200 || this.apiReqs.status === 201) {
                let data = this.apiReqs.responseText;
                let result = JSON.parse(data);
                callback(null,result);
            } else {
                callback(`Error: ${this.apiReqs.status}`);
            }
        };
        this.apiReqs.onerror = () => callback('Request failed');
        this.apiReqs.send(JSON.stringify(user));
    }

    // put method

    put = (URL, user, callback) => {
        this.apiReqs.open('PUT', URL, true);
        this.apiReqs.setRequestHeader('Content-Type', 'application/json');
        // this.apiReqs.send(JSON.stringify(user));
        this.apiReqs.onload = () => {
            if (this.apiReqs.status === 200) {
                let data = this.apiReqs.responseText;
                let result = JSON.parse(data);
                callback(null,result);
            } else {
                callback(`Error: ${this.apiReqs.status}`);
            }
        };
        this.apiReqs.onerror = () => callback('Request failed');
        this.apiReqs.send(JSON.stringify(user));
    }



    // delete method
    delete = (URL, callback) => {
        this.apiReqs.open('DELETE', URL, true);
        // this.apiReqs.send();
        this.apiReqs.onload = () => {
            if (this.apiReqs.status === 200) {
                let data = this.apiReqs.responseText;
                // Handle empty or non-JSON response
                let result = data ? JSON.parse(data) : {};
                callback(null, result);
            } else {
                callback(`Error: ${this.apiReqs.status}`);
            }
        };  
        this.apiReqs.onerror = () => callback('Request failed');
        this.apiReqs.send();                 
    }
}
