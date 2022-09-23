import { Router } from "express";
import { postPoll } from "../controllers/pollController.js";
import { ValidatePoll } from "../middleware/ValidatePoll.js";

const pollRouter = Router();

pollRouter.post('/poll', ValidatePoll, postPoll);

export default pollRouter;