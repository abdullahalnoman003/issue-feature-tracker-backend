import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../types";

const router = Router();

router.post("/",auth(UserRole.contributor, UserRole.maintainer), issuesController.createReport);
router.get("/",issuesController.getAllReport);
router.get("/:id",issuesController.getSingleReport );
router.patch("/:id", issuesController.updateSingleReport);
router.delete("/:id", issuesController.deleteSingleReport);

export const issuesRoute =router;