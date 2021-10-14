const resource = require("express").Router();
const authorization = require("../middleware/authorization");
import connectDb from "../db";

resource.post("/resource", authorization, async (req, res) => {
    //Deconstructing The Request Body
    const { title, text } = req.body;

    //Finding The Admin By Their Unique Id
    const admin = await connectDb.query(
        "SELECT * FROM mentors WHERE id = $1",
        [req.user]
    );

    //Checking If The Specific Admin Exists
    //Adding the resource if admin exists
        //Must have "admin" role check here since database has many mentors
    if (admin.rows.length === 1) {
        connectDb.query(
            "INSERT INTO resourses (title, article, mentor_id) VALUES ($1, $2, $3) RETURNING *",
            [title, text, req.user]
        );

        res.json({result: "resource has been added"});
    }
    //Returning Error If Admin Does Not Exist
    else {
        res.status(401).send("Not Authorized");
    }
});

module.exports = resource;