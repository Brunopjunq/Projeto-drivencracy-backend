import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
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
    const {id} = req.params;

    try {

        const choices = await db.collection('choices').find({ pollId: id }).toArray();

        if(choices.length === 0) {
            return res.status(404).send('Enquete não existe');
        }
        res.status(200).send(choices);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getResult(req,res) {
    const id = req.params.id;

    try {
        const votes = await db.collection('votes').find().toArray();
        const choices = await db.collection('choices').find({pollId: id}).toArray();
        const counter = [];
        let ranking = 0;
        let biggest = 0;

        for(let i = 0; i < choices.length; i++) {
            counter.push(0);
        }

        for(let i = 0; i < choices.length; i++) {
            for(let j = 0; j < votes.length; j++) {
                if(choices[i]._id === (new ObjectId(votes[j].choiceId).toString())) {
                    counter[i]++;
                    ranking = 1;
                    if(counter[i] > biggest) {
                        ranking = i;
                        biggest = counter[i];
                    }
                }
            }
        }

        const poll = await db.collection('polls').find({_id: new ObjectId(id)}).toArray();

        res.send({
            ...poll, 
            result: {
                title: choices[ranking].title,
                votes: Math.max(...counter)
            }});


    } catch (error) {
        res.sendStatus(500);
    }
}