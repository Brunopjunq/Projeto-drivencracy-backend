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
        
    } catch (error) {
        
    }
}