import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; 
import repos from '../sources/repos.js'
import NotFoundPage from "./NotFoundPage.js";
import Getrepogitinfo from '../sources/gitapiinfo'; 
import GitInfo from "../components/GitInfo.js";
import CommentsList from "../components/CommentsList.js";

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

    if (!repo) {
        return <NotFoundPage />
    }

    return (
        <>        
            <h1 className="article-header">Repository: { repo.name } </h1>
            <p className="stars">This page was liked {repoInfo.stars} time(s)</p>
            <GitInfo info={data.find(item => item.name == repo.name)} />
            {repo.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <CommentsList comments={repoInfo.comments} />
        </>
    )
}

export default RepoPage; 