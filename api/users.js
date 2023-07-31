/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();

const {createUser, userName, password} = require("../db")


// POST /api/users/register

usersRouter.post("/users/register", async (req, res, next) => {
    try {
        const newUser = await createUser(userName, password);

        return newUser;
    } catch (error) {
    next (error);
    }
});

// POST /api/users/login

usersRouter.post("/login", async (req, res, next) => {
    try {
        const user_username = req.body;

        if (!(user_username && password)) {
      res.status(400).send("All input is required");}

      const oldUser = await userName.findOne({ user_username });

      if (oldUser)
      return res.status(409).send("User Already Exists. Please login");
        
            return 
    } catch (error) {
        next(error);
    }
});

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;
