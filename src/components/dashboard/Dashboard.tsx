import { FC } from "react";
import { dashboardProps } from "../../utils/props";
import UnosFirme from "./options/unos-firme/UnosFirme";

const Dashboard: FC<dashboardProps> = ({ page }) => {
    return (
        <div className="Dashboard">
            {page === 1 && <UnosFirme />}
            {page === 2 && <p>2</p>}
            {page === 3 && <p>3</p>}
            {page === 4 && <p>4</p>}
        </div>
    );
};

export default Dashboard;
