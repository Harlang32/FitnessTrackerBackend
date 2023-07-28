const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/fitness-dev';

const client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
  user: `postgres`,
  host: "localhost",
  database: "fitness-dev",
  password: `password`,
  port: 5432,
});

module.exports = {client};
