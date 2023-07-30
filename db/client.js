const { Pool } = require('pg');

const { config } = require("dotenv");

config();

const { USER, HOST, PASSWORD, DATABASE, PORT } = process.env;

const client = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined
});

module.exports = client;
