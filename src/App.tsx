import React, {useEffect} from 'react';
import {document1, document2} from "./Components/FakeData/FakeData";

function App() {
    useEffect(() => {
        Promise.all([document1(), document2()])
            .then(res => console.dir(res))
    }, [])

    return (
        <div>
            hi
        </div>
    );
}

export default App;
