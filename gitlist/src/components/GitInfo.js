import React, { useEffect, useState } from "react"; 

const GitInfo = ({data, name}) => {
    let info = data[name]; 
    if (info) {
        return (
            <table className="git-info">
               <tr> 
                 <td> 
                    <p>{ info.html_url }</p>
                 </td>
                 <td>
                    <p>{ info.created_at }</p>
                 </td>
                </tr>
                <tr>
                 <td>
                    <p>{ info.description } </p>
                 </td>
                 <td>
                    <p>{ info.updated_at }</p>
                 </td>
                </tr>
            </table>
        )
    }

    return (
        <>no info from github</>
    )
}

export default GitInfo; 