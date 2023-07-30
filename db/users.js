/* eslint-disable */
const client = require("./client");
const bcrypt = require("bcrypt") 

// database functions

// user functions
async function createUser({ username, password }) {
  
  const SALT_COUNT = 10;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try {
      console.log("creating users...")
      console.log(username, password, hashedPassword)
      const {rows: [user]} = await client.query(
        `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
        [username, hashedPassword]
      );
      delete user.password;
      return user;
    } catch (error) {
      console.log("Error creating users...")
      throw error;
    }
  }

async function getUser({ username, password }) {
  try {
  const user = await getUserByUserName(username);
  const hashedPassword = user.password;
  // isValid will be a boolean based on wether the password matches the hashed password
  const isValid = await bcrypt.compare(password, hashedPassword);

  if(isValid) {
    delete user.password;

    return user;
  }
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

const { rows: [user], } = await client.query(`

SELECT id, username, password FROM users 
WHERE username =$1;
`,

[userName]);



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
