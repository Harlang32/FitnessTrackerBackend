const express = require('express');
const activitiesRouter = express.Router();
const {
  getAllActivities,
  createActivity,
  updateActivity, 
  getActivityById,
  getActivityByName
} = require("../db/activities");
const { requireUser} = require("./utils");

const { getPublicRoutinesByActivity } = require("../db/routines");

// GET /api/activities/:activityId/routines

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {

    const { activityId } = req.params
    try {
        const routinesByActivity = getPublicRoutinesByActivity({
            id: activityId
        });

        if (routinesByActivity.length > 0) {
        res.send({ routinesByActivity });
        } else {
            res.send({
              message: `Activity ${activityId} not found`,
              name: "activityNotFoundError",
              error: `Activity ${activityId} not found`,
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// GET /api/activities

activitiesRouter.get("/api/activities", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    res.send(allActivities);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/activities
activitiesRouter.post("/api/activities", requireUser, async (req, res, next) => {
  try {
    const newActivity = await createActivity(req.body);
    res.send(newActivity);
  } catch (error) {
    next(error)
  }
});
// PATCH /api/activities/:activityId

activitiesRouter.patch( "/api/activities/:activityId", async (req, res, next) => {
    const { name, description } = req.body;
    const updateFields = {};
    updateFields.id = parseInt(req.params.activityId);

    if (name) {
      updateFields.name = name.toLowerCase();
    }
    if (description) {
      updateFields.description = description;
    }
    try {
      const updatedItem = await updateActivity(updateFields);

      if (updatedItem) {
        res.send({ updatedItem });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = activitiesRouter;
