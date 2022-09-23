import { ObjectId } from "mongodb";
import db from "../db.js";
import dayjs from "dayjs";

export async function postChoice(req,res) {
    const body = req.body;

    const choice = {
        title: body.title,
        pollId: body.pollId
    }

    try {

        const pollExist = await db.collection('polls').findOne({ _id: new ObjectId(choice.pollId)});

        if(!pollExist) {
            return res.status(404).send('A enquete não existe!');
        }

        const choiceExist = await db.collection('choices').findOne({title: choice.title});

        if(choiceExist) {
            return res.status(409).send('Esta opção já existe!');
        }

        const pollExpiredDate = pollExist.expireAt;
        const now = dayjs().format("YYYY-MM-DD HH:mm");

        if(now > pollExpiredDate) {
            return res.status(403).send('Enquente expirou!');
        }

        await db.collection('choices').insertOne(choice);
        res.status(201).send(choice);
        
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function postVote(req,res){
    const id = req.params.id

    
}