import React, { useEffect, useState } from "react"; 

function Getapiinfo(login) {
    const [data, setData] = useState(null); 

    useEffect(() => {
        fetch(`https://api.github.com/users/${login}/repos`)
        .then((response) => response.json())
        .then(setData); 
    }, []);

    if (data) {
        return data; 
    };

    return [];
}

export default Getapiinfo;
