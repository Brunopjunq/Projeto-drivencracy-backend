import dayjs from 'dayjs';
import db from '../db.js';

export async function getPoll(req,res) {
    try {
        const polls = await db.collection('polls').find().toArray();
        res.send(polls);

    } catch (error) {
        return res.sendStatus(500);
        
    }
}

export async function postPoll(req,res) {
    const body = req.body;
    
    const poll = {
        title: body.title,
        expireAt: body.expireAt
    }

    if(poll.expireAt === '' || !poll.expireAt) {
        poll.expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
    }

    try {
        await db.collection('polls').insertOne(poll);
        res.status(201).send('Enquente criada com sucesso!')
        
    } catch (error) {
        return res.sendStatus(500);
        
    }
}

export async function getChoices(req,res) {
    const id = req.params.id;

    try {

        const choices = await db.collection('choices').find({ pollId: id}).toArray();

        if(choices.length === 0) {
            return res.status(404).send('Enquete não existe');
        }
        res.status(200).send(choices);

    } catch (error) {
        res.sendStatus(500);
    }
}