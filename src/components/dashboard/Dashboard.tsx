import { FC } from "react";

import { dashboardProps } from "../../utils/props";

import UnosFirme from "./options/unos-firme/UnosFirme";
import PregledFirmi from "./options/pregled-firmi/PregledFirmi";
import UnosPlanaDogadjaja from "./options/unos-plana-dogadjaja/UnosPlanaDogadjaja";

const Dashboard: FC<dashboardProps> = ({ page }) => {
    return (
        <div className="Dashboard">
            {page === 1 && <UnosFirme />}
            {page === 2 && <PregledFirmi />}
            {page === 3 && <UnosPlanaDogadjaja />}
            {page === 4 && <p>4</p>}
        </div>
    );
};

export default Dashboard;
