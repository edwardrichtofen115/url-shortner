const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

var swaggerDocument = require('./swagger.json');

const app = express();

//Connect to db
connectDB();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Defining the routes
app.use('/', require('./routes/index'));

app.use('/api/url', require('./routes/url'));

// const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => console.log(`App is running`));
