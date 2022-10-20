import { useParams } from "react-router-dom";
import repos from '../sources/repos.js'

const RepoPage = () => {
    const { repoId } = useParams(); 
    const repo = repos.find(repo => repo.name === repoId);

    return (
        <>        
            <h1>Repository: { repo.name } </h1>
            {repo.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
        </>
    )
}

export default RepoPage; 