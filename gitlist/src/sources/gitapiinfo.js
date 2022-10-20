import React, { useEffect, useState } from "react"; 

const ApiInfo = ({login}) => {
    const [data, setData] = useState(null); 

    useEffect(() => {
        fetch(`https://api.github.com/repos/${login}/`)
        .then((response) => response.json())
        .then(setData); 
    }, []);

    if (data) {
        return data; 
    };

    return (
        <></>
    )
}

export default ApiInfo; 