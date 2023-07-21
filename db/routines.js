const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    console.log("creating routines...");
    const { rows } = await client.query(`
    SELECT creatorID, 
    isPublic, 
    description, 
    name,
    FROM activities;
    `);

    return rows;
  } catch (error) {
    console.log("Error creating routines");
    
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
}

async function getRoutineById(id) {}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
