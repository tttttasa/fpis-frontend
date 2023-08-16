import { useState } from "react";

import "./App.scss";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
    const [page, setPage] = useState<number>(1);

    return (
        <div className="App">
            <Navbar setPage={setPage} />
            <Dashboard page={page} />
        </div>
    );
};

export default App;
