const router = require("express").Router();
import connectDb from "../db";
const authorization = require("../middleware/authorization");

router.get("/dashboard", authorization, async (req, res) => {
    try {
        const users = await connectDb.query("SELECT name, student_number, role_type_id FROM users WHERE id = $1", [req.user]);

        res.json(users.rows[0]);

    } catch (e) {
        console.error(e.message);
        res.status(500).json("Server Error");
    }
})

router.get("/dashboard/profile", authorization, async (req, res) => {
	try {
		const users = await connectDb.query(
			"SELECT id, role_type_id, name, email, biography, student_number, create_date FROM users WHERE id = $1", [req.user]);
			res.json(users.rows[0]);
	} catch (e) {
		console.error(e.message);
		res.status(500).json("Server Error");
	}
});

module.exports = router;