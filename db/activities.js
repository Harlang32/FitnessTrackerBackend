const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  try {
    // console.log("Inside createActivity.");
    const {
      rows: [activity],
    } = await client.query(
      `
        INSERT INTO activities(name, description) 
        VALUES($1, $2) 
        RETURNING *;
      `,
      [name, description]
    );

    return activity;
  } catch (error) {
    console.log("Error creating Activity.");
    throw error;
  }
}

// Get All Activities function
async function getAllActivities() {
  try {
    console.log("Inside getAllActivities.");

    const { rows: activities } = await client.query(`
        SELECT * FROM activities;
      `);

    return activities;
  } catch (error) {
    console.log("Error creating Activity.");
    throw error;
  }
}

// Get Activity By Id function
async function getActivityById(id) {
  try {
    console.log("Inside getActivityById.");
    const {
      rows: [activity],
    } = await client.query(
      `
        SELECT *
        FROM activities
        WHERE id=$1;`,
      [id]
    );

    return activity;
  } catch (error) {
    console.log("Error getting Activity By Id.");
    throw error;
  }
}

// Get Activity By Name function
async function getActivityByName(name) {
  try {
    console.log("Inside getActivityByName.");
    const {
      rows: [activity],
    } = await client.query(
      `
        SELECT *
        FROM activities
        WHERE name=$1;
      `,
      [name]
    );

    return activity;
  } catch (error) {
    console.log("Error getting Activity By Name.");
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log("inside attachActivitiesToRoutines");
    const { rows: routineActivities 
    } = await client.query(`
    SELECT activities.*, routineActivities."routineId", routineActivities."activityId", routineActivities.id AS "routineActivityId, routineActivities.duration, routineActivities.count
    FROM activities
    JOIN routineActivities ON activities.id = routine_activities."activityId";

    `);

    routines.array.forEach(routine => {
      routine.activities = routineActivities.filter(
        (routineActivities) => routineActivities.routineId === routine.id
      );
      
    });
    return routines;
  } catch (error) {
    throw error;
  }
}

// Update Activity function
// Update Activity function
async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  console.log("Inside updateActivity, String set to: ", setString);

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  // do update the name and description
  try {
    console.log("Inside updateActivity.");

    const {
      rows: [activity],
    } = await client.query(
      `
        UPDATE activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    // return the updated activity
    return activity;
  } catch (error) {
    console.log("Error updating Activity.");
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
