const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  try {
    console.log("Creating activity.");
    const {
      rows: [activity],
    } = await client.query(
      `
    INSERT INTO activities(name, description)
    VALUES ($1, $2);
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `,
      [name, description]
    );

    return activity;
  } catch (error) {
    console.log("Error creating Activity.");
    throw error;
    // return the new activity
  }
}

async function getAllActivities() {
  try {
    console.log("Getting all activities...");
    const { rows } = await client.query(`
    SELECT id, name, description
    FROM activities;
    `);

    return rows;
  } catch (error) {
    console.log("Error creating Activity.");
    
  }
  // select and return an array of all activities
}

async function getActivityById(id) {
  try {
    console.log("Getting activity by ID...");
    const { rows } =
    await client.query(`
    SELECT id, 
    FROM activities WHERE id = ${id};


    `)
    return rows;
  } catch (error) {
    console.log("Error getting Activities by Id");
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    console.log("Getting activities by name...")
    const {rows} = await client.query(`
    SELECT name, 
    FROM activities WHERE name = ${name};
    `)
    return rows;
  } catch (error) {
    console.log("Error getting activities by name...")
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  const setString = Object.keys(fields).map((
    key, index) => `"${ key }"=$${ index + 1}`
  ).join(',');

try {

  if (setString.length > 0) {
    await client.query(`
    UPDATE activities;
    SET ${ setString }
    WHERE id=${id}
    RETURNING *;
    `, Object.values(fields));
  }
  
    return await getActivityById(id)
   } catch (error) {
     console.log("Error updating activity...");
    throw error;
 
  }
}


module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
