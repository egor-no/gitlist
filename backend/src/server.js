import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

app.get('/api/repos/:name', async (req, res) => {
    const { name } = req.params; 

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-repos-db'); //#endregion

    const repo = await db.collection('repos').findOne({ name }); 

    if (repo) {
        res.json(repo); 
    } else {
        res.status(404).send('Repo is not found'); 
    }
});

app.put('/api/repos/:name/star', (req, res) => {
    const { name } = req.params; 
    const repo = reposInfo.find(r => r.name === name);
    if (repo) {
        repo.stars += 1;
        res.send(`The ${name} repo now has ${repo.stars} stars`);
    } else {
        res.send('That repo doesn\'t exist :('); 
    }
});

app.post('/api/repos/:name/comments', (req,res) => {
    const { postedBy, text } = req.body; 
    const { name } = req.params; 

    const repo = reposInfo.find(r => r.name === name);

    if (repo) {
        repo.comments.push({ postedBy, text });
        res.send(repo.comments);
    } else {
        res.send('That repo doesn\'t exist :('); 
    }
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});