const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoute = require('./api/apiRoute');

const hostname = '127.0.0.1';
const port = '5000';


// body-parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// cors configuration
app.use(cors());


// api route configuration
app.use('/api', apiRoute);



//get request

app.get('/', (req, res) => {
    res.send('<h3>Maba</h3>');
});

app.listen(port, hostname, () => {
    console.log(`Express server started at http://${hostname}:${port}`);
});