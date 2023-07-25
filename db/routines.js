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

async function getRoutineById(id) {
try {
  
  const { rows } =
await client.query(`
SELECT id,
FROM routines WHERE id = ${id};
  `)
  return rows;
} catch (error){
console.log("Error getting Routines by Id");

  }
}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {
  try {
 const { rows } =
await client.query(`
SELECT *,
FROM routines;
  `);
  return rows;
} catch (error){
console.log("Error getting all Routines.");

  }
}

async function getAllPublicRoutines() {
   try {
     const { rows } = await client.query(`
SELECT *,
FROM routines
WHERE "isPublic"=TRUE;
  `);
     return rows;
   } catch (error) {
     console.log("Error getting all Routines.");
   }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(`
SELECT *
FROM routines
WHERE username = ${username};
;
  `);
    return rows;
  } catch (error) {
    console.log("Error getting all Routines by user.");
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(`
SELECT *
FROM routines 
WHERE "isPublic"=TRUE
WHERE username = ${username};
  `);
    return rows;
  } catch (error) {
    console.log("Error getting all Routines.");
  }
}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  try {
    if (setString.length > 0) {
      await client.query(
        `
    UPDATE routines;
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
        Object.values(fields)
      );
    }

    return await getRoutineById(id);
  } catch (error) {
    console.log("Error updating routine...");
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    await client.query(` 
    DELETE from routines WHERE id = ${id};`) 
  } catch (error){
    console.log("Error deleting routines");
  }
}

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
