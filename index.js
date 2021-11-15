const express = require('express');

const app = express();

const PORT = 3000;

//CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Conrol-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); //maybe also PUT
    next();
});

//Middleware that enables json body encoding
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Swagger import
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

//Route imports
const openCrxRoute = require('./routes/opencrx.js');
const orangeHrmRoute = require('./routes/orangeHrm')
const testRoute = require('./routes/test')

const api = '/api';
//Hello world Route 
app.get('/', (req,res,next)=>{
    res.send('Hello World!');
});

app.use(api, openCrxRoute);
app.use(api, orangeHrmRoute);
app.use(api, testRoute);

app.listen(PORT, ()=>{
    console.log(`App is listening at http://localhost:${PORT}`);
});
