import { useState } from "react";

import "./App.scss";

import Navbar from "./components/navbar/Navbar";

const App = () => {
    const [page, setPage] = useState<number>(1);

    return (
        <div className="App">
            <Navbar setPage={setPage} />
            <p>{page}</p>
        </div>
    );
};

export default App;
