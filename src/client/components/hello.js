/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */
/* eslint-disable no-extra-parens */

import React, {useEffect, useState} from "react";

const HelloWorld = () => {
    const [trees, setTrees] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTrees = () => {
            fetch("/api/trees")
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setTrees(data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                });
        };
        fetchTrees();
    }, []);

    return (
        <div>
            <h1 style={{backgroundColor: "lightblue"}}>{"Hello, world!"}</h1>
            <div id={"map"} />
            <hr />
            {loading ? (
                <p>{"Chargement..."}</p>
            ) : (
                trees.map(t => (
                    <div key={t._id}>
                        <pre>{JSON.stringify(t)}</pre>
                    </div>
                ))
            )}
            <small>{"becode/trouvkach"}</small>
        </div>
    );
};

export default HelloWorld;
