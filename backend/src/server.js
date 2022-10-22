import express from 'express';

let reposInfo = [{
    name: 'winylka',
    stars: 0,
    comments: [],
},{
    name: 'winylka-inventory',
    stars: 0,
    comments: [],
},{
    name: 'music-catalog',
    stars: 0,
    comments: [],
},{
    name: 'todo-react',
    stars: 0,
    comments: [],
},{
    name: 'clangametesttask',
    stars: 0,
    comments: [],
},{
    name: 'gitlist',
    stars: 0,
    comments: [],
}]

const app = express();
app.use(express.json());

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