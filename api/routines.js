const express = require('express');
const { getAllRoutines, createRoutine, getRoutineById } = require('../db');
const router = express.Router();

// GET /api/routines
router.get("/api/routines", async (req, res, next) => {
try {
const allRoutines = await getAllRoutines();

res.send({ routines: allRoutines});
} catch ({name, message}) {
    next({ name, message});
}
});

// POST /api/routines

router.post("api/routines", async (req, res, next) => {
    try {
        const newRoutine = await createRoutine(req.body);

        if (newRoutine) {
            res.send(newRoutine);
        }
        
    } catch (error) {
        next(error);
    }
});

// PATCH /api/routines/:routineId

router.patch("api/routines/:routineId", async (req, res, next) => {
    try {
        const routineId  = await getRoutineById(isPublic, name, goal);

    res.send( routineId);

     } catch (error) {
     next(error);
    }
});

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
