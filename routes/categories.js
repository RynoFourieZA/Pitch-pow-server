import { Router } from "express";
import connectDb from "../db";

const router = new Router();

router.post("/categories", async (req, res) => {
	try {
		const { type, explanation } = req.body;

		console.log(type);

		let query = "INSERT INTO category_type (name, description) VALUES ($1, $2)";

		if (type.length === 0) {
			return res.status(400).send("Please enter a valid request.");
		}

		if (type.length > 0) {
			const checkingCategory = await connectDb.query(
				"SELECT * FROM category_type WHERE name = $1",
				[type]
			);

			if (checkingCategory.rows.length !== 0) {
				res.status(400).send("This category already exist.");
			} else {
                connectDb
				.query(query, [type, explanation])
				.then(() => res.send("New category was created."));
            }
		}

	} catch (e) {
		console.error(e.message);
		res.status(500).send("Server error");
	}
});

router.get("/categories", async (req, res) => {
    try {
		let query = "SELECT name, description FROM category_type WHERE isDELETE = 'False'";

		connectDb
        .query(query)
        .then(result => res.json(result.rows));
    } catch (e) {
        console.error(e.message);
		res.status(500).send("Server error");
    }
});

module.exports = router;