const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(morgan('common'));
app.use(helmet());  
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Replace with your frontend URL
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World!',
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});