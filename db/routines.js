const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    console.log("creating routines...");
    const { 
      rows: [routine], } = await client.query(`
    INSERT INTO routines("creatorId", "isPublic", "name", "goal" )
    VALUES($1, $2, $3, $4)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;

    `,
    [creatorId, isPublic, name, goal]);

    return routine;
  } catch (error) {
    console.log("Error creating routines");
    
  }
}
async function getRoutineById(id) {
try {
  
  const { rows: [routine] } =
await client.query(`
SELECT id,
FROM routines WHERE id = $1;
  `, 
  [id]
  );
  return routine;
} catch (error){
console.log("Error getting Routines by Id");
throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
 const { rows } = await client.query(`

SELECT *,
FROM routines;

  `);
  return rows;
} catch (error){
console.log("Error getting all Routines.");

  }
}

async function getAllRoutines() {
  try {
 const { rows } = await client.query(`
SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id;
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
WHERE "isPublic"=TRUE
JOIN activities;
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
// Not Finished yet...
//***************************************** */
// async function getPublicRoutinesByActivity({ id }) {
//   try {
//     let getPublicRoutinesByActivity = await getAllPublicRoutines();

//     const { 
//       rows: [ routines ],
//     } = await client.query(`
//     SELECT activities.id, routines.id,
//     FROM activities
//     JOIN routines ON activities.id=routines.id;
//     `)
//     return [routines];
//   } catch (error) {
//     console.log("Error getting public routines by activity.")
//     throw(error);
//   }
// }
//********************************************* */
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
    const { rows } =
    await client.query(` 
    DELETE from routines WHERE id = ${id};`) 
    return rows;
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
  // getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
