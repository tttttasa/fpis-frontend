import { Navigate, Route, Routes } from "react-router-dom";

import UnosFirme from "./options/unos-firme/UnosFirme";
import PregledFirmi from "./options/pregled-firmi/PregledFirmi";
import UnosPlanaDogadjaja from "./options/unos-plana-dogadjaja/UnosPlanaDogadjaja";
import PregledPlanovaDogadjaja from "./options/pregled-planova-dogadjaja/PregledPlanovaDogadjaja";

const Dashboard = () => {
    return (
        <div className="Dashboard">
            <Routes>
                <Route path="/unos-firme" element={<UnosFirme />} />
                <Route path="/pregled-firmi" element={<PregledFirmi />} />
                <Route
                    path="/unos-plana-dogadjaja"
                    element={<UnosPlanaDogadjaja />}
                />
                <Route
                    path="/pregled-planova-dogadjaja"
                    element={<PregledPlanovaDogadjaja />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/unos-firme" replace />}
                />
            </Routes>
        </div>
    );
};

export default Dashboard;
