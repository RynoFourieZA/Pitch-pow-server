import { Router } from "express";
import connectDb from "../db";

const router = new Router();

router.post("/answers", async (req,res) => {
    try {
        const { type, id, email} = req.body;
        const questions = await connectDb.query("SELECT id FROM questions WHERE pitch_type_id = $1  AND id = $2 AND is_delete = false", [type, id]);
        const question_id =  questions.rows[0].id;

        const student = await connectDb.query("SELECT student_number FROM users WHERE email = $1 AND is_delete = false", [email]);
        const student_no = student.rows[0].student_number;

        const student_pitch = await connectDb.query("SELECT id FROM pitch WHERE student_number = $1", [student_no]);
        const pitch_id = student_pitch.rows[0].id;

        const query = "INSERT INTO answers (question_id, student_number, pitch_id) VALUES ($1, $2, $3)";

        connectDb
			.query(query, [question_id, student_no, pitch_id])
			.then(() => res.send("Question and Answers was created"));

	} catch (e) {
        console.error(e.message);
		res.status(500).send("Server error");
    }
});

router.get("/answers", async (req, res) => {
    try {
        connectDb
			.query("SELECT is_answered, question_id, student_number, comment_id FROM answers WHERE is_delete = false")
			.then((result) => res.json(result.rows));

    } catch (e) {
        console.error(e.message);
		res.status(500).send("Server error");
    }
});

router.get("/answers/search", async (req, res) => {
    try {
        const { student } = req.query;

        connectDb
			.query("SELECT is_answered, question_id, comment_id FROM answers WHERE student_number = $1 AND is_delete = false", [student])
			.then((result) => res.json(result.rows));

    } catch (e) {
        console.error(e.message);
		res.status(500).send("Server error");
    }
});

router.put("/answers", async (req, res) => {
    try {
        const { id, student_no, answered } = req.body;

        connectDb
            .query("UPDATE answers SET is_answered = $1 WHERE id = $2 AND student_number = $3 AND is_delete = false", [answered, id, student_no])
            .then(() => res.send("Your answer was updated."));
    } catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

router.put("/answers/delete", async (req, res) => {
	try {
		const { id, student_no, deleted } = req.body;

		connectDb
			.query("UPDATE answers SET is_delete = $1 WHERE id = $2 AND student_number = $3", [deleted, id, student_no])
			.then(() => res.send("Your answer was deleted."));
	} catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;