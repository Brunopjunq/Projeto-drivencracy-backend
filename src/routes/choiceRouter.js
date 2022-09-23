import { Router } from "express";
import { ValidateChoice } from "../middleware/ValidateChoice.js";
import { postChoice } from "../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post('/choice', ValidateChoice, postChoice);

export default choiceRouter;