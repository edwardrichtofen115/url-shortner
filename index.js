const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to db
connectDB();

app.use(express.json());

//Defining the routes
app.use('/', require('./routes/index'));

app.use('/api/url', require('./routes/url'));

// const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () =>
	console.log(`App is running on port: ${PORT}`)
);
