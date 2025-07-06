import { Router } from "express";
import { registerOwner, loginOwner } from "../controllers/ownerController.js";

const router = Router();

router.post("/regowner", registerOwner);
router.post("/reglogin", loginOwner);

export default router;