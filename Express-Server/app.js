const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./api/apiRouter');


const app = express();

const HOSTNAME = '127.0.0.1';
const PORT = 4000;

// configure bodyParser

const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({extended:false});

app.use(jsonParser);
app.use(urlEncodedParser);

// configure cors

app.use(cors());



//configure Router
app.use('/api', apiRouter);

//get request

app.get('/', (request, response) => {
    response.send(`<h2>Welcome to Express Server of Employee Portal</h2>`);
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Express Server is started at http://${HOSTNAME}:${PORT}`);
});
