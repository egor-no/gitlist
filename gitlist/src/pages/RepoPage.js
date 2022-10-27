import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import repos from '../sources/repos.js'
import NotFoundPage from "./NotFoundPage.js";
import Getrepogitinfo from '../sources/gitapiinfo'; 
import GitInfo from "../components/GitInfo.js";

const RepoPage = () => {
    const [repoInfo, setRepoInfo] = useState({stars: 0, comments: []});

    useEffect(() => {
        setRepoInfo({stars: Math.ceil(Math.random() * 10), comments: []});
    }, []);

    const { repoId } = useParams(); 
    const repo = repos.find(repo => repo.name === repoId);
    const data = Getrepogitinfo("egor-no", repo.name);

    if (!repo) {
        return <NotFoundPage />
    }

    return (
        <>        
            <h1>Repository: { repo.name } </h1>
            <GitInfo info={data} />
            <p>This page was liked {repoInfo.stars} time(s)</p>
            {repo.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
        </>
    )
}

export default RepoPage; 