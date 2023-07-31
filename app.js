require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

// const router = require('router');

// Setup your Middleware and API Router here

module.exports = app;
