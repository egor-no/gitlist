import { Link } from 'react-router-dom';
import GitInfo from './GitInfo';
import Getapiinfo from '../sources/gitapiinfo'; 

const RepoList = ({ repos }) => {
    const data = Getapiinfo("egor-no");

    return (
    <>
        {repos.map(repo => (
            <div key={repo.name}>
                <Link key={ repo.name + "-head" } className="repo-list-item" to={`/repos/${repo.name}`}>
                    <h3>{ repo.name }</h3>
                </Link>
                    <GitInfo key={repo.name + "-gitinfo" } info={data.find(item => item.name == repo.name)} />
                <Link key={ repo.name + "-body" } className="repo-list-item" to={`/repos/${repo.name}`}>
                    <p>{ repo.content[0].substring(0,110) }...</p>
                </Link>
            </div>
        ))}
        
    </>
    ); 
}

export default RepoList;