import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import repos from '../sources/repos.js'
import NotFoundPage from "./NotFoundPage.js";
import Getrepogitinfo from '../sources/gitapiinfo'; 
import GitInfo from "../components/GitInfo.js";
import CommentsList from "../components/CommentsList.js";
import AddCommentForm from "../components/AddCommentForm.js";
import useUser from "../hooks/useUser.js";

const RepoPage = () => {
    const [repoInfo, setRepoInfo] = useState({stars: 0, comments: [], canUpvote: false});
    const { canUpvote } = repoInfo; 
    const { repoId } = useParams(); 
    const { user, isLoading } = useUser();

    const navigate = useNavigate(); 

    useEffect(() => {
        const loadRepoInfo = async() => {
            const token = user && await user.getIdToken(); 
            const headers = token ? { authtoken : token } : {}; 
            const response = await axios.get(`/api/repos/${repoId}`, { headers });
            const repoInfo = response.data; 
            setRepoInfo(repoInfo);
        }

        if (!isLoading) {
            loadRepoInfo(); 
        }
        
    }, [isLoading, user]);

    const repo = repos.find(repo => repo.name === repoId);
    const data = Getrepogitinfo("egor-no", repo.name);

    const addStar = async() => {
        const token = user && await user.getIdToken(); 
        const headers = token ? { authtoken : token } : {}; 
        const response = await axios.put(`/api/repos/${repoId}/star`, null, { headers }); 
        setRepoInfo(response.data);
    }

    if (!repo) {
        return <NotFoundPage />
    }

    return (
        <>        
            <h1 className="article-header">Repository: { repo.name } </h1>
            <div id="stars-section"> 
                {user 
                    ? <button className="stars" onClick={addStar}>{ canUpvote ? '☆' : 'Already Upvoted' }</button>  
                    : <button onClick={() => {
                        navigate('/login');
                    }} >Log in to upvote</button> }
                <p className="stars">  This page was liked {repoInfo.stars} time(s)</p>
            </div> 
            <GitInfo info={data.find(item => item.name == repo.name)} />
            {repo.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            {user 
                ?   <AddCommentForm 
                        repoName={repoId}
                        onRepoUpdated={setRepoInfo} />
                : <button onClick={() => {
                    navigate('/login');
                }} >Log in to comment</button> }
            <CommentsList comments={repoInfo.comments} />
        </>
    )
}

export default RepoPage; 