import { Router } from "express";
import { getDashBoardData } from "../controllers/dashboardController.js";
const router = Router();
// GET route to get Dashboard data
router.get("/dashboard", getDashBoardData);

export default router;
