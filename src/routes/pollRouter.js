import { Router } from "express";
import { getChoices, getPoll, getResult, postPoll } from "../controllers/pollController.js";
import { ValidatePoll } from "../middleware/ValidatePoll.js";

const pollRouter = Router();

pollRouter.post('/poll', ValidatePoll, postPoll);
pollRouter.get('/poll', getPoll);
pollRouter.get('/poll/:id/choice', getChoices);
pollRouter.get('/poll/:id/result', getResult);

export default pollRouter;