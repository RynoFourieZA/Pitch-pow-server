import { Router } from "express";
import connectDb from "../db";

const router = new Router();

router.get("/users", async (_, res) => {
    try {
        connectDb
			.query("SELECT role_type.role_name, users.name, users.email, users.biography FROM users INNER JOIN role_type ON users.role_type_id = role_type.id WHERE confirm = true and is_delete = false ORDER BY name")
			.then((result) => res.json(result.rows));
    } catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

router.get("/users/all", async (_, res) => {
	try {
		connectDb
			.query("SELECT role_type.role_name, users.name, users.email, users.student_number, users.biography, users.confirm, users.is_delete FROM users INNER JOIN role_type ON users.role_type_id = role_type.id ORDER BY name")
			.then((result) => res.json(result.rows));
	} catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

router.get("/users/students", async (_, res) => {
    try {
        connectDb
            .query("SELECT name, email, student_number, biography FROM users WHERE role_type_id = 1 AND confirm = true AND is_delete = false ORDER BY name")
            .then(result => res.json(result.rows));
    } catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

router.get("/users/students/search", async (req, res) => {
	try {
        const { number } = req.query;
		connectDb
			.query("SELECT name, email, student_number, biography FROM users WHERE  student_number = $1 AND confirm = true AND is_delete = false", [number])
			.then((result) => res.json(result.rows));
	} catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

router.get("/users/mentors", async (_, res) => {
	try {
		connectDb
			.query("SELECT name, email, biography FROM users WHERE role_type_id = 2 AND confirm = true AND is_delete = false ORDER BY name")
			.then((result) => res.json(result.rows));
	} catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

router.get("/users/mentors/search", async (req, res) => {
	try {
		const { email } = req.query;
		connectDb
			.query("SELECT name, email, biography FROM users WHERE  email = $1 AND confirm = true AND is_delete = false", [email])
			.then((result) => res.json(result.rows));
	} catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;