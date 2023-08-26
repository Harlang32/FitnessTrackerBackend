const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken')

console.log(process.env.JWT_SECRET);

router.use(async (req, res, next) => {
    const prefix = "Bearer";
    const auth = req.header("Authorization");

    if (!auth) {
      // nothing to see here
        next();
    } else if (auth.startsWith(prefix)) {
    // recover the token
    const token = auth.slice(prefix.length);

    try {
      // recover the data
      const { id } = jwt.verify(token, JWT_SECRET);

      // get the user from the database

      if (id ) {
        req.user = await getUserById(id);
        next();
      }
  
      // note: this might be a user or it might be null depending on if it exists

      // attach the user and move on
   

    } catch ({ name, message }) {
      next({ name, message });
      // there are a few types of errors here
    }
  } else {
    next({ 
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
     })
  }
});


// GET /api/health
router.get('/health', async (req, res) => {
    console.log("Server health is good!");
    res.send("All is well");
});

// ROUTER: /api/users 
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
const { getUserById } = require('../db');
router.use('/routine_activities', routineActivitiesRouter);

module.exports = router;
