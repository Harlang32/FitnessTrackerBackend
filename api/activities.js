const express = require('express');
const { getAllActivities, createActivity, getPublicRoutinesByActivity, updateActivity } = require('../db');
const router = express.Router();

// GET /api/activities/:activityId/routines

router.get("/:activityId/routines", async (req, res, next) => {
    try {
        const userRoutines = getPublicRoutinesByActivity({
            id: parseInt(req.params.activityId),
        });

        res.send({ userRoutines });
    } catch (error) {
        next(error);
    }
})

// GET /api/activities

router.get("/api/activities", async (req, res, next) => {
try {
    const activities = await getAllActivities();
    res.send(activities);
} catch (error) {
    next(error);
}
});

// POST /api/activities
router.post("/api/activities", async (req, res, next) => {
    try {
        const newActivity = await createActivity(req.body);
        res.send(newActivity)
    } catch (error) {
        next(error);
    }
});
// PATCH /api/activities/:activityId

router.patch("/api/activities/:activityId", async (req, res, next) => {
        const { name, description } = req.body;
        const updateFields = {}
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

    } catch ({name, message}) {
      next({name, message});
    }
});

module.exports = router;
