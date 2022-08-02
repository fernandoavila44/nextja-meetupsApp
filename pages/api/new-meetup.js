// /api/new-meetup
import { MongoClient } from "mongodb";

export default async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://admin-fernando:03eszv07@cluster0.23yhe.mongodb.net/meetups');
        const db = client.db();

        const mettupsCollection = db.collection('meetups');

        const result = await mettupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});

    }
}