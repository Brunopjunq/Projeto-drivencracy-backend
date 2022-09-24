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
        const Idchoices = choices.map((choice) => choice._id.toString());
        const filterVotes = votes.filter((vote) => choices.includes(vote.choiceId));
        const filterVotesId = filterVotes.map((vote) => vote.choiceId);
        
        function findBiggest(votes) {
            return votes.sort((a,b) => votes.filter(vote => vote===a).length - votes.filter(vote => vote===b).length).pop();
        }

        const IdBiggest = findBiggest(filterVotesId);
        const QntVotes = filterVotes.filter((vote) => vote.choiceId === IdBiggest).length;
        const mostVoted = choices.filter((choice) => choice._id.toString() === IdBiggest);
        const poll = await db.collection('polls').findOne({_id: ObjectId(id)})

        res.send({
            ...poll,
            result: {
                title: mostVoted[0].title,
                votes: QntVotes
            }
        })
    } catch (error) {
        res.sendStatus(500);
    }
}