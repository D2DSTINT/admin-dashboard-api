import { Router } from "express";
import {
    addService,
    deleteService,
    getAllServices,
} from "../controllers/serviceController.js";
const router = Router();

// POST route to add a new service
router.post("/", addService);
router.delete("/:name", deleteService);
router.get("/", getAllServices);

export default router;
