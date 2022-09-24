import { Router } from "express";
import { ValidateChoice } from "../middleware/ValidateChoice.js";
import { postChoice, postVote } from "../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post('/choice', ValidateChoice, postChoice);
choiceRouter.post('/choice/:id/vote', postVote);

export default choiceRouter;