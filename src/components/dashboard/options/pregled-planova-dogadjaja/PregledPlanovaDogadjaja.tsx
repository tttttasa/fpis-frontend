import { useEffect, useState } from "react";
import axios from "axios";

import "./PregledPlanovaDogadjaja.scss";
import { PlanDogadjajaDataDto } from "../../../../utils/dtos";
import IzmenaPlanaDogadjaja from "../izmena-plana-dogadjaja/IzmenaPlanaDogadjaja";

const PregledPlanovaDogadjaja = () => {
    const [imePM, setImePM] = useState<string>("");
    const [visibleData, setVisibleData] = useState<PlanDogadjajaDataDto[]>([]);

    const [isChangeVisible, setIsChangeVisible] = useState<boolean>(false);
    const [changePlanDogadjaja, setChangePlanDogadjaja] =
        useState<PlanDogadjajaDataDto>();

    // Stanja
    const [popunjen, setPopunjen] = useState<boolean>(false);
    const [proveren, setProveren] = useState<boolean>(false);
    const [validiran, setValidiran] = useState<boolean>(false);

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
        if (imePM.length === 0 && !popunjen && !proveren && !validiran) {
            try {
                const response = await axios.get(
                    `http://localhost:4500/plan-dogadjaja`
                );

                setVisibleData(response.data);
            } catch (e) {
                setVisibleData([]);
            }
        } else if (!popunjen && !proveren && !validiran) {
            try {
                const response = await axios.get(
                    `http://localhost:4500/plan-dogadjaja/${imePM}`
                );

                setVisibleData(
                    (response.data as PlanDogadjajaDataDto[]).sort(
                        (a, b) =>
                            a.planDogadjaja.idPlanaDogadjaja! -
                            b.planDogadjaja.idPlanaDogadjaja!
                    )
                );
            } catch (e) {
                setVisibleData([]);
            }
        } else if (imePM.length === 0) {
            try {
                const response = await axios.get(
                    `http://localhost:4500/plan-dogadjaja/${popunjen}/${proveren}/${validiran}`
                );

                setVisibleData(
                    (response.data as PlanDogadjajaDataDto[]).sort(
                        (a, b) =>
                            a.planDogadjaja.idPlanaDogadjaja! -
                            b.planDogadjaja.idPlanaDogadjaja!
                    )
                );
            } catch (e) {
                setVisibleData([]);
            }
        } else {
            try {
                const response = await axios.get(
                    `http://localhost:4500/plan-dogadjaja/${imePM}/${popunjen}/${proveren}/${validiran}`
                );

                setVisibleData(response.data);
            } catch (e) {
                setVisibleData([]);
            }
        }
    };

    const deletePlan = async (planId: number) => {
        await axios.delete(`http://localhost:4500/plan-dogadjaja/${planId}`);
    };

    const updateVisibleData = (index: number) => {
        const data = [...visibleData];
        data.splice(index, 1);
        setVisibleData(data);
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
                <div className="query">
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
                <div className="stanja">
                    <div className="stanje">
                        <p>Popunjen</p>
                        <input
                            type="checkbox"
                            checked={popunjen}
                            onClick={() => {
                                setPopunjen(!popunjen);
                            }}
                        />
                    </div>
                    <div className="stanje">
                        <p>Proveren</p>
                        <input
                            type="checkbox"
                            checked={proveren}
                            onClick={() => {
                                setProveren(!proveren);
                            }}
                        />
                    </div>
                    <div className="stanje">
                        <p>Validiran</p>
                        <input
                            type="checkbox"
                            checked={validiran}
                            onClick={() => {
                                setValidiran(!validiran);
                            }}
                        />
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
                            <th style={{ width: "150px" }}>Datum zarvšetka</th>
                            <th style={{ width: "200px" }}>Ime PM-a</th>
                            <th style={{ width: "120px" }}>Broj gostiju</th>
                            <th></th>
                            <th></th>
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
                                        {formatDate(
                                            plan.planDogadjaja.datumPocetka
                                        )}
                                    </td>
                                    <td>
                                        {formatDate(
                                            plan.planDogadjaja.datumZavrsetka
                                        )}
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
                                    <td>
                                        <button
                                            onClick={() => {
                                                setChangePlanDogadjaja(
                                                    visibleData[index]
                                                );
                                                setIsChangeVisible(true);
                                            }}
                                            style={
                                                plan.planDogadjaja.stanje ===
                                                "validiran"
                                                    ? {
                                                          cursor: "default",
                                                          opacity: "1",
                                                      }
                                                    : {}
                                            }
                                            disabled={
                                                plan.planDogadjaja.stanje ===
                                                "validiran"
                                            }
                                        >
                                            Izmeni
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                deletePlan(
                                                    plan.planDogadjaja
                                                        .idPlanaDogadjaja!
                                                );
                                                updateVisibleData(index);
                                            }}
                                            style={
                                                plan.planDogadjaja.stanje ===
                                                "validiran"
                                                    ? {
                                                          cursor: "default",
                                                          opacity: "1",
                                                      }
                                                    : {}
                                            }
                                            disabled={
                                                plan.planDogadjaja.stanje ===
                                                "validiran"
                                            }
                                        >
                                            Izbriši
                                        </button>
                                    </td>
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
