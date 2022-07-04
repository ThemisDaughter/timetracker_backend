require('dotenv').config();
const router = require('./routes/index.router');

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());


app.use(router);


app.listen(PORT, console.log(`app running on http://localhost:${PORT}`))