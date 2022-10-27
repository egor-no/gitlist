import { Link } from 'react-router-dom';

const GitInfo = (info) => {
    if (info.info) {
        return (
            <table className="git-info">
            <tbody>
               <tr> 
                 <td className='git-info-link-td'> 
                    <p className="git-info"><b>github: </b>
                        <a href={ info.info.html_url } target="_new" key={ info.info.full_name }>{ info.info.full_name }</a>
                    </p>
                 </td>
                 <td  className='git-info-date-td'>
                    <p className="git-info">{ info.info.created_at.substr(0,10)+" "+ info.info.created_at.substr(0,16).substr(11) }</p>
                 </td>
                </tr>
                <tr>
                 <td className='git-info-info-td' colSpan={2}>
                    <p className="git-info">{ info.info.description } </p>
                 </td>
                </tr>
            </tbody>
            </table>
        )
    }

    return (
        <>no info from github</>
    )
}

export default GitInfo; 