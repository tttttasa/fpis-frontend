import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="container">
                <Link className="btn" to={"unos-firme"}>
                    Unos firme
                </Link>
                <Link className="btn" to={"pregled-firmi"}>
                    Pregled firmi
                </Link>
                <Link className="btn" to={"unos-plana-dogadjaja"}>
                    Unos plana dogadjaja
                </Link>
                <Link className="btn" to={"pregled-planova-dogadjaja"}>
                    Pregled planova dogadjaja
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
