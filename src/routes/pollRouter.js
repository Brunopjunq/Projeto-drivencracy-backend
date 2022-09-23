import { Router } from "express";
import { getPoll, postPoll } from "../controllers/pollController.js";
import { ValidatePoll } from "../middleware/ValidatePoll.js";

const pollRouter = Router();

pollRouter.post('/poll', ValidatePoll, postPoll);
pollRouter.get('/poll', getPoll);

export default pollRouter;