import RepoList from "../components/RepoList";
import repos from "../sources/repos";

const HomePage = () => {
    return (
        <>
            <h1>This is the home page! </h1>
            <RepoList repos={repos}/>

        </>

    )
}

export default HomePage; 