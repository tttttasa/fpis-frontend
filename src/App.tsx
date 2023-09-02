import "./App.scss";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Dashboard />
            </div>
        </BrowserRouter>
    );
};

export default App;
