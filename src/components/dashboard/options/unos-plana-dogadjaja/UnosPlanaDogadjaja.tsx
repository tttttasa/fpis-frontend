import { useEffect, useState } from "react";
import axios from "axios";

import "./UnosPlanaDogadjaja.scss";

import Notification from "../../../notifications/Notification";

import {
    AktivnostDto,
    PMDto,
    PlanDogadjajaDataDto,
    SpisakGostijuDto,
    StavkaPlanaDogadjajaDto,
    StavkaPlanaDogadjajaViewDto,
} from "../../../../utils/dtos";

const UnosPlanaDogadjaja = () => {
    const [notification, setNotification] = useState<string>("");

    // Projektni menadžer
    const [idPM, setIdPM] = useState<string>("");
    const [imePrezPM, setImePrezPM] = useState<string>("");
    const [PM, setPM] = useState<PMDto>({});

    // Spisak gostiju
    const [idSpisak, setIdSpisak] = useState<string>("");
    const [brojGostiju, setBrojGostiju] = useState<string>("");
    const [spisak, setSpisak] = useState<SpisakGostijuDto>({});

    // Aktivnosti
    const [aktivnosti, setAktivnosti] = useState<AktivnostDto[]>([]);
    const [izabranaAktivnost, setIzabranaAktivnost] = useState<AktivnostDto>(
        {}
    );
    const [brojSale, setBrojSale] = useState<string>("");
    const [napomena, setNapomena] = useState<string>("");

    // Stavke
    const [stavke, setStavke] = useState<StavkaPlanaDogadjajaDto[]>([]);
    const [stavkeView, setStavkeView] = useState<StavkaPlanaDogadjajaViewDto[]>(
        []
    );

    useEffect(() => {
        getAktivnosti();
    }, []);

    const getAktivnosti = async () => {
        try {
            const response = await axios.get(`http://localhost:4500/aktivnost`);

            setAktivnosti(response.data);
            setIzabranaAktivnost(response.data[0]);
        } catch {
            setNotification(
                "Došlo je do greške pri povezivanju sa servisom (Pristup bazi 'Aktivnosti')"
            );
        }
    };

    const getPM = async () => {
        const id = Number(idPM);

        if (!isNaN(id)) {
            try {
                const response = await axios.get(
                    `http://localhost:4500/projektni-menadzer/${id}`
                );

                const pm: PMDto = response.data;

                if (!pm) {
                    setNotification("PM sa datom šifrom ne postoji!");
                    setIdPM("");
                    setImePrezPM("");
                    return;
                }

                setPM(pm);
                setImePrezPM(
                    `${pm.imeProjektnogMenadzera} ${pm.prezimeProjektnogMenadzera}`
                );
            } catch (e) {
                setNotification(
                    "Došlo je do greške pri komunikaciji sa serverom"
                );
                setIdPM("");
                setImePrezPM("");
            }
        } else {
            setNotification("Molim Vas unesite validnu šifru (broj)");
            setIdPM("");
            setImePrezPM("");
        }
    };

    const getSpisak = async () => {
        const id = Number(idSpisak);

        if (!isNaN(id)) {
            try {
                const response = await axios.get(
                    `http://localhost:4500/spisak-gostiju/${id}`
                );

                const spisak: SpisakGostijuDto = response.data;

                if (!spisak) {
                    setNotification(
                        "Spisak gostiju sa datom šifrom ne postoji!"
                    );
                    setIdSpisak("");
                    setBrojGostiju("");
                    return;
                }

                setSpisak(spisak);
                setBrojGostiju(`${spisak.brojGostiju}`);
            } catch (e) {
                setNotification(
                    "Došlo je do greške pri komunikaciji sa serverom"
                );
                setIdSpisak("");
                setBrojGostiju("");
            }
        } else {
            setNotification("Molim Vas unesite validnu šifru (broj)");
            setIdSpisak("");
            setBrojGostiju("");
        }
    };

    const addStavka = () => {
        if (
            !izabranaAktivnost ||
            brojSale.length === 0 ||
            napomena.length === 0
        ) {
            setNotification("Molim Vas popunite sva polja stavke!");
            return;
        }

        const stavka: StavkaPlanaDogadjajaDto = {
            redniBrojStavke: stavke.length + 1,
            idAktivnosti: izabranaAktivnost.idAktivnost,
            brojSale: Number(brojSale),
            napomena: napomena,
        };

        const stavkaView: StavkaPlanaDogadjajaViewDto = {
            redniBrojStavke: stavka.redniBrojStavke,
            brojSale: stavka.brojSale,
            napomena: stavka.napomena,
            aktivnost: izabranaAktivnost,
        };

        const temp = izabranaAktivnost;

        console.log(temp);
        console.log(aktivnosti);
        console.log(stavka);
        console.log(stavkaView);

        setStavke((stavke) => [...stavke, stavka]);
        setStavkeView((stavke) => [...stavke, stavkaView]);
    };

    const savePlan = async () => {
        if (imePrezPM.length === 0) {
            setNotification("Potrebno je postaviti PM-a!");
            return;
        }

        if (brojGostiju.length === 0) {
            setNotification("Potrebno je izabrati spisak gostiju!");
            return;
        }

        if (stavke.length === 0) {
            setNotification("Potrebno je imati bar jednu stavku!");
            return;
        }

        const planDogadjajaData: PlanDogadjajaDataDto = {
            planDogadjaja: {
                idProjektnogMenadzera: PM.idProjektnogMenadzera,
                idSpiska: spisak.idSpiska,
            },
            stavke: stavke,
        };

        console.log(stavke);

        try {
            await axios.post(
                `http://localhost:4500/plan-dogadjaja`,
                planDogadjajaData
            );

            setNotification("Plan događaja je uspešno sačuvan!");
        } catch (e) {
            setNotification("Došlo je do greške pri čuvanju plana događaja!");
        }

        resetForm();
    };

    const resetForm = () => {
        setIdPM("");
        setImePrezPM("");
        setPM({});

        setIdSpisak("");
        setBrojGostiju("");
        setSpisak({});

        setIzabranaAktivnost({});

        setBrojSale("");
        setNapomena("");

        setStavke([]);
        setStavkeView([]);
    };

    return notification.length === 0 ? (
        <div className="unos-plana-dogadjaja">
            <div className="menadzer">
                <div className="id">
                    <p>Šifra projektnog menadžera:</p>
                    <input
                        type="text"
                        id="projeknti-menadzer"
                        value={idPM}
                        onChange={(e) => {
                            setIdPM(e.target.value);
                        }}
                    />
                </div>
                <div className="ime-prezime">
                    <p>Ime i prezime menadžera:</p>
                    <input
                        type="text"
                        id="ime-prezime"
                        disabled={true}
                        value={imePrezPM}
                    />
                </div>
                <div
                    className="btn"
                    onClick={() => {
                        getPM();
                    }}
                >
                    Pronađi PM
                </div>
            </div>
            <div className="spisak">
                <div className="id">
                    <p>Šifra spiska:</p>
                    <input
                        type="text"
                        id="projeknti-menadzer"
                        value={idSpisak}
                        onChange={(e) => {
                            setIdSpisak(e.target.value);
                        }}
                    />
                </div>
                <div className="gosti">
                    <p>Broj gostiju:</p>
                    <input
                        type="text"
                        id="gosti"
                        disabled={true}
                        value={brojGostiju}
                    />
                </div>
                <div
                    className="btn"
                    onClick={() => {
                        getSpisak();
                    }}
                >
                    Pronađi spisak
                </div>
            </div>
            <div className="aktivnost">
                <div className="top">
                    <div className="aktivnost-field">
                        <p>Aktivnost:</p>
                        <select
                            id="aktivnost"
                            onChange={(e) => {
                                aktivnosti.forEach((aktivnost) => {
                                    if (aktivnost.naziv === e.target.value) {
                                        setIzabranaAktivnost(aktivnost);
                                    }
                                });
                            }}
                        >
                            {aktivnosti.map((aktivnost) => {
                                return <option>{aktivnost.naziv}</option>;
                            })}
                        </select>
                    </div>
                    <div className="broj">
                        <p>Broj sale:</p>
                        <input
                            type="text"
                            id="broj"
                            value={brojSale}
                            onChange={(e) => {
                                const result = Number(e.target.value);

                                if (result === 0) {
                                    setBrojSale("");
                                    return;
                                }

                                if (!isNaN(result)) {
                                    setBrojSale(result.toString());
                                }
                            }}
                        />
                    </div>
                </div>
                <textarea
                    id="napomena"
                    cols={50}
                    rows={5}
                    value={napomena}
                    onChange={(e) => {
                        setNapomena(e.target.value);
                    }}
                ></textarea>
                <div
                    className="btn"
                    onClick={() => {
                        addStavka();
                    }}
                >
                    Ubaci stavku
                </div>
            </div>
            <div className="stavke">
                <p>Unete stavke:</p>
                <div className="table">
                    <table id="header">
                        <thead>
                            <tr>
                                <th>RB Stavke</th>
                                <th>Naziv aktivnosti</th>
                                <th>Broj sale</th>
                                <th>Napomena</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="table-wrapper">
                        <table>
                            <tbody>
                                {stavkeView.map((stavka) => {
                                    return (
                                        <tr>
                                            <td>{stavka.redniBrojStavke}</td>
                                            <td>{stavka.aktivnost?.naziv}</td>
                                            <td>{stavka.brojSale}</td>
                                            <td>{stavka.napomena}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="inputs">
                    <div
                        className="btn"
                        onClick={() => {
                            savePlan();
                        }}
                    >
                        Potvrdi unos
                    </div>
                    <div
                        className="btn"
                        onClick={() => {
                            resetForm();
                        }}
                    >
                        Otkaži
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Notification text={notification} setText={setNotification} />
    );
};

export default UnosPlanaDogadjaja;
