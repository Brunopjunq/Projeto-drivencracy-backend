import pollSchema from '../schemas/pollSchema.js';
import db from '../db.js';

export async function ValidatePoll(req, res, next){
    const poll = req.body;

    const validation = pollSchema.validate(poll);

    if(validation.error) {
        return res.sendStatus(422);
    }

    const pollExist = await db.collection('polls').findOne({ title: poll.title});

    if(pollExist) {
        return res.sendStatus(409);
    }

    next();
}