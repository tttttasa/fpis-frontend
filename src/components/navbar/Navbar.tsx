import { FC } from "react";

import "./Navbar.scss";
import { navbarProps } from "../../utils/props";

const Navbar: FC<navbarProps> = ({ setPage }) => {
    return (
        <div className="Navbar">
            <div className="container">
                <div
                    className="btn"
                    onClick={() => {
                        setPage(1);
                    }}
                >
                    Unos nove firme
                </div>
                <div
                    className="btn"
                    onClick={() => {
                        setPage(2);
                    }}
                >
                    Pregled firmi
                </div>
                <div
                    className="btn"
                    onClick={() => {
                        setPage(3);
                    }}
                >
                    Unos plana dogadjaja
                </div>
                <div
                    className="btn"
                    onClick={() => {
                        setPage(4);
                    }}
                >
                    Pregled planova dogadjaja
                </div>
            </div>
        </div>
    );
};

export default Navbar;
