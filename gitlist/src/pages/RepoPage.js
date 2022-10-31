import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; 
import repos from '../sources/repos.js'
import NotFoundPage from "./NotFoundPage.js";
import Getrepogitinfo from '../sources/gitapiinfo'; 
import GitInfo from "../components/GitInfo.js";
import CommentsList from "../components/CommentsList.js";
import AddCommentForm from "../components/AddCommentForm.js";

const RepoPage = () => {
    const [repoInfo, setRepoInfo] = useState({stars: 0, comments: []});

    useEffect(() => {
        const loadRepoInfo = async() => {
            const response = await axios.get(`/api/repos/${repoId}`);
            const repoInfo = response.data; 
            console.log(JSON.stringify(repoInfo));
            setRepoInfo(repoInfo);
        }

        loadRepoInfo(); 
    }, []);

    const { repoId } = useParams(); 
    const repo = repos.find(repo => repo.name === repoId);
    const data = Getrepogitinfo("egor-no", repo.name);

    const addStar = async () => {
        const response = await axios.put(`/api/repos/${repoId}/star`); 
        setRepoInfo(response.data);
    }

    if (!repo) {
        return <NotFoundPage />
    }

    return (
        <>        
            <h1 className="article-header">Repository: { repo.name } </h1>
            <div id="stars-section"> 
                <button onClick={addStar}>☆</button>
                <p className="stars">  This page was liked {repoInfo.stars} time(s)</p>
            </div> 
            <GitInfo info={data.find(item => item.name == repo.name)} />
            {repo.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <AddCommentForm 
                repoName={repoId}
                onRepoUpdated={setRepoInfo} />
            <CommentsList comments={repoInfo.comments} />
        </>
    )
}

export default RepoPage; 