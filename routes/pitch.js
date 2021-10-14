import { Router } from "express";
import { createPitch, updatePitch, findPitchByUser, deletePitch } from '../controllers/pitch';
import authorization from '../middleware/authorization';

const router = new Router();

router.get("/", authorization, findPitchByUser);
router.post("/", authorization, createPitch);
router.put("/:id", authorization, updatePitch);
router.delete("/:id", authorization, deletePitch);

module.exports = router;
