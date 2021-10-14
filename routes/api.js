import { Router } from "express";

import connectDb from "../db";

const router = new Router();

router.get("/", (_, res) => {
	connectDb
		.query("SELECT * FROM test_table")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

module.exports = router;
