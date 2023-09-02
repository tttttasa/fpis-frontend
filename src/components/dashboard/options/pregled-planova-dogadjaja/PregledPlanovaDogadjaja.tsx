import { useEffect, useState } from "react";
import axios from "axios";

import "./PregledPlanovaDogadjaja.scss";
import {
    PlanDogadjajaDataDto,
    StavkaPlanaDogadjajaDto,
} from "../../../../utils/dtos";
import IzmenaPlanaDogadjaja from "../izmena-plana-dogadjaja/IzmenaPlanaDogadjaja";

const PregledPlanovaDogadjaja = () => {
    const [imePM, setImePM] = useState<string>("");
    const [visibleData, setVisibleData] = useState<PlanDogadjajaDataDto[]>([]);

    const [isChangeVisible, setIsChangeVisible] = useState<boolean>(false);
    const [changePlanDogadjaja, setChangePlanDogadjaja] =
        useState<PlanDogadjajaDataDto>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4500/plan-dogadjaja`
                );

                setVisibleData(response.data);
            } catch (e) {
                setVisibleData([]);
            }
        };

        fetchData();
    }, [isChangeVisible]);

    const findMatches = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4500/plan-dogadjaja/${imePM}`
            );

            setVisibleData(response.data);
        } catch (e) {
            setVisibleData([]);
        }
    };

    const findEarliestDate = (stavke: StavkaPlanaDogadjajaDto[]): string => {
        let earliest = stavke[0].aktivnost?.termin;

        stavke.forEach((stavka) => {
            if (stavka.aktivnost?.termin! < earliest!) {
                earliest = stavka.aktivnost?.termin;
            }
        });

        return formatDate(earliest!);
    };

    const formatDate = (date: Date) => {
        date = new Date(date);

        let month: string = "";

        if ((date.getMonth() + 1) / 10 === 1) {
            month = (date.getMonth() + 1).toString();
        } else {
            month = `0${(date.getMonth() + 1).toString()}`;
        }

        return `${date.getFullYear()}-${month}-${date.getDate()}`;
    };

    return !isChangeVisible ? (
        <div className="pregled-planova-dogadjaja">
            <div className="upper">
                <div className="left">
                    <p>Uneti kriterijume pretrage:</p>
                    <input
                        type="text"
                        placeholder="Ime i prezime zaduženog PM-a"
                        value={imePM}
                        onChange={(e) => {
                            setImePM(e.target.value);
                        }}
                    />
                </div>
                <div className="right">
                    <div
                        className="btn"
                        onClick={() => {
                            findMatches();
                        }}
                    >
                        Pretraži
                    </div>
                </div>
            </div>
            <div className="lower">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "150px" }}>
                                ID Plana događaja
                            </th>
                            <th style={{ width: "150px" }}>Datum početka</th>
                            <th style={{ width: "200px" }}>Ime PM-a</th>
                            <th style={{ width: "120px" }}>Broj gostiju</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((plan, index) => {
                            return (
                                <tr>
                                    <td>
                                        {plan.planDogadjaja.idPlanaDogadjaja}
                                    </td>
                                    <td>
                                        {findEarliestDate(
                                            plan.stavke
                                        )?.toString()}
                                    </td>
                                    <td>
                                        {
                                            plan.planDogadjaja.projektniMenadzer
                                                ?.imeProjektnogMenadzera
                                        }
                                    </td>
                                    <td>
                                        {plan.planDogadjaja.spisak?.brojGostiju}
                                    </td>
                                    <button
                                        onClick={() => {
                                            setChangePlanDogadjaja(
                                                visibleData[index]
                                            );
                                            setIsChangeVisible(true);
                                        }}
                                    >
                                        Izmeni
                                    </button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <IzmenaPlanaDogadjaja
            planDogadjaja={changePlanDogadjaja!}
            setIsChangeVisible={setIsChangeVisible}
        />
    );
};

export default PregledPlanovaDogadjaja;
