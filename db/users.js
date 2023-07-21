const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  
    try {
      console.log("creating users...")
      const result = await client.query(
        `
      INSERT INTO users(username, password)
      VALUES ($1, $2);
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
        [username, password]
      );

      return result;
    } catch (error) {
      console.log("Create user")
      throw error;
    }
  }

async function getUser({ username, password }) {
  try {
  const { rows } = await client.query(`SELECT id, ${username}, ${password} FROM USERS;`)

  return rows;
} catch (error) {
  console.log("Error getting user");
  throw error;
}
}
async function getUserById(userId) {
  try {
    console.log("Getting users...")
const { rows : [user], } = await client.query(`SELECT id, username FROM users WHERE id=${userId};`);


if (!user) {
  return null;
}
return user;

} catch (error) {
  console.log("Error getting user by id.")
  throw error;
}
}

async function getUserByUsername(userName) {
  try {
    console.log("Getting user by Username");
const { rows: [user] } = await client.query(`SELECT id, username FROM users WHERE username =${userName}`);


if (!user) {
  return null;
}
return user;
  } catch (error){
    console.log("Error getting user by username...")
    throw error;
  }

}



module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
