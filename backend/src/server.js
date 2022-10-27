import express from 'express';
import {db, connectToDB} from './db.js';

const app = express();
app.use(express.json());

app.get('/api/repos/:name', async (req, res) => {
    const { name } = req.params; 

    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        res.json(repo); 
    } else {
        res.status(404).send('Repo is not found'); 
    }
});

app.put('/api/repos/:name/star', async (req, res) => {
    const { name } = req.params; 

    await db.collection('repos').updateOne({ name }, {
        $inc: { stars: 1},
    });

    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        res.send(`The ${name} repo now has ${repo.stars} stars`);
    } else {
        res.send('That repo doesn\'t exist :('); 
    }
});

app.post('/api/repos/:name/comments', async (req,res) => {
    const { postedBy, text } = req.body; 
    const { name } = req.params; 

    await db.collection('repos').updateOne({ name }, {
        $push: {comments: {postedBy, text} },
    });

    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        res.send(repo.comments);
    } else {
        res.send('That repo doesn\'t exist :('); 
    }
});

connectToDB(() => {
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})
