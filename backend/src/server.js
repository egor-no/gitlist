import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import {db, connectToDB} from './db.js';
import { ConnectionPoolReadyEvent } from 'mongodb';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
}); 

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {};

    next();
});

app.get('/api/repos/:name', async (req, res) => {
    const { name } = req.params; 
    const { uid } = req.user; 

    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        const starIds = repo.starIds || []; 
        repo.canUpvote = uid && !starIds.includes(uid); 
        res.json(repo); 
    } else {
        res.status(404).send('Repo is not found'); 
    }
});

app.use((req, res, next) => {
    if (req.user) {
        next(); 
    } else {
        res.sendStatus(401);
    }
})

app.put('/api/repos/:name/star', async (req, res) => {
    const { name } = req.params; 
    const { uid } = req.user; 
    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        const starIds = repo.starIds || []; 
        const canUpvote = uid && !starIds.includes(uid); 
        
        if (canUpvote) {
            await db.collection('repos').updateOne({ name }, {
                $inc: { stars: 1},
                $push : { starIds : uid },
            });
        }
    
        const updatedRepo = await db.collection('repos').findOne({ name }); 
        res.json(updatedRepo);
    } else {
        res.send('That repo doesn\'t exist :('); 
    }
});

app.post('/api/repos/:name/comments', async (req,res) => {
    const { text } = req.body; 
    const { name } = req.params; 
    const { email } = req.user; 

    await db.collection('repos').updateOne({ name }, {
        $push: {comments: {postedBy: email, text} },
    });

    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        res.json(repo);
    } else {
        res.send('That repo doesn\'t exist :('); 
    }
});

app.delete('/api/repos/:name/comments/', async (req,res) => {
    const { name } = req.params; 

    await db.collection('repos').updateOne({ name }, {
       "$set": {'comments': [] }
    });

    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        res.json(repo);
    } else {
        res.send('That repo doesn\'t exist :('); 
    }
});

connectToDB(() => {
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})
