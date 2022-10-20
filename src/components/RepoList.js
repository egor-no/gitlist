import { Link } from 'react-router-dom';
import GitInfo from './GitInfo';
import ApiInfo from '../sources/gitapiinfo'; 

const RepoList = ({ repos }) => {
    const data = <ApiInfo login="egor-no"/>;
    return (
    <>
        {repos.map(repo => (
        <Link key={ repo.name } className="repo-list-item" to={`/${repo.name}`}>
            <h3>{ repo.name }</h3>
            <GitInfo name={repo.name} data={data} />
            <p>{ repo.content[0].substring(0,110) }...</p>
        </Link>
        ))}
    </>
    );
}

export default RepoList;