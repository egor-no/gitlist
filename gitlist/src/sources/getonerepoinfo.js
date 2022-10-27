import React, { useEffect, useState } from "react"; 

function Getrepogitinfo(login, repo) {
    const [data, setData] = useState(null); 

    useEffect(() => {
        fetch(`https://api.github.com/repos/${login}/${repo}`)
        .then((response) => response.json())
        .then(setData); 
    }, "");

    if (data) {
        return data; 
    };

    return "";
}

export default Getrepogitinfo; 