import { FC, useEffect, useState } from "react";
import axios from "axios";

import "./IzmenaPlanaDogadjaja.scss";

import Notification from "../../../notifications/Notification";

import {
    AktivnostDto,
    PMDto,
    PlanDogadjajaDataDto,
    SpisakGostijuDto,
    StavkaPlanaDogadjajaDto,
} from "../../../../utils/dtos";
import { izmenaPlanaDogadjaja } from "../../../../utils/props";

const IzmenaPlanaDogadjaja: FC<izmenaPlanaDogadjaja> = ({
    planDogadjaja,
    setIsChangeVisible,
}) => {
    const [notification, setNotification] = useState<string>("");

    // Projektni menadžer
    const [idPM, setIdPM] = useState<string>("");
    const [imePrezPM, setImePrezPM] = useState<string>("");
    const [PM, setPM] = useState<PMDto>({});

    // Spisak gostiju
    const [idSpisak, setIdSpisak] = useState<string>("");
    const [brojGostiju, setBrojGostiju] = useState<string>("");
    const [spisak, setSpisak] = useState<SpisakGostijuDto>({});

    // Datumi
    const [pocetak, setPocetak] = useState<Date>();
    const [zavrsetak, setZavrsetak] = useState<Date>();

    // Stanja
    const [stanje, setStanje] = useState<string>();
    const [proveren, setProveren] = useState<boolean>();
    const [validiran, setValidiran] = useState<boolean>();

    // Aktivnosti
    const [aktivnosti, setAktivnosti] = useState<AktivnostDto[]>([]);
    const [izabranaAktivnost, setIzabranaAktivnost] = useState<AktivnostDto>(
        {}
    );
    const [brojSale, setBrojSale] = useState<string>("");
    const [napomena, setNapomena] = useState<string>("");

    // Stavke
    const [stavke, setStavke] = useState<StavkaPlanaDogadjajaDto[]>([]);

    // Stavka za izmenu
    const [stavka, setStavka] = useState<StavkaPlanaDogadjajaDto>();

    useEffect(() => {
        getAktivnosti();

        setIdPM(
            `${planDogadjaja.planDogadjaja.projektniMenadzer?.idProjektnogMenadzera}`
        );
        setImePrezPM(
            `${planDogadjaja.planDogadjaja.projektniMenadzer?.imeProjektnogMenadzera} ${planDogadjaja.planDogadjaja.projektniMenadzer?.prezimeProjektnogMenadzera}`
        );
        setPM(planDogadjaja.planDogadjaja.projektniMenadzer!);

        setPocetak(new Date(planDogadjaja.planDogadjaja.datumPocetka));
        setZavrsetak(new Date(planDogadjaja.planDogadjaja.datumZavrsetka));

        setIdSpisak(`${planDogadjaja.planDogadjaja.spisak?.idSpiska}`);
        setBrojGostiju(`${planDogadjaja.planDogadjaja.spisak?.brojGostiju}`);
        setSpisak(planDogadjaja.planDogadjaja.spisak!);

        setStavke(
            planDogadjaja.stavke!.sort(
                (first, second) =>
                    first.redniBrojStavke! - second.redniBrojStavke!
            )
        );

        setStanje(planDogadjaja.planDogadjaja.stanje);
        setProveren(
            planDogadjaja.planDogadjaja.stanje === "proveren" ||
                planDogadjaja.planDogadjaja.stanje === "validiran"
        );
        setValidiran(planDogadjaja.planDogadjaja.stanje === "validiran");
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
            aktivnost: izabranaAktivnost,
            brojSale: Number(brojSale),
            napomena: napomena,
        };

        setStavke((stavke) => [...stavke, stavka]);
    };

    const removeStavka = (index: number) => {
        const newStavke = stavke.filter((_, i) => i !== index);

        newStavke.forEach((stavka, index) => {
            stavka.redniBrojStavke = index + 1;
        });

        setStavke(newStavke);
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

        if (!pocetak) {
            setNotification("Postavite datum pocetka!");
            return;
        }

        if (!zavrsetak) {
            setNotification("Postavite datum zavrsetka!");
            return;
        }

        const planDogadjajaData: PlanDogadjajaDataDto = {
            planDogadjaja: {
                idPlanaDogadjaja: planDogadjaja.planDogadjaja.idPlanaDogadjaja,
                projektniMenadzer: PM,
                spisak: spisak,
                datumPocetka: pocetak,
                datumZavrsetka: zavrsetak,
                stanje: validiran
                    ? "validiran"
                    : proveren
                    ? "proveren"
                    : planDogadjaja.planDogadjaja.stanje,
            },
            stavke: stavke,
        };

        try {
            await axios.put(
                `http://localhost:4500/plan-dogadjaja`,
                planDogadjajaData
            );

            setNotification("Plan događaja je uspešno sačuvan!");
        } catch (e) {
            setNotification("Došlo je do greške pri čuvanju plana događaja!");
        }
    };

    const formatDate = (date: Date) => {
        if (!date) {
            return;
        }

        let day: string = "";

        if (date.getDate() > 9) {
            day = date.getDate().toString();
        } else {
            day = `0${date.getDate().toString()}`;
        }

        let month: string = "";

        if ((date.getMonth() + 1) / 10 === 1) {
            month = (date.getMonth() + 1).toString();
        } else {
            month = `0${(date.getMonth() + 1).toString()}`;
        }

        return `${date.getFullYear()}-${month}-${day}`;
    };

    const setStavkaZaIzmenu = (stavka: StavkaPlanaDogadjajaDto) => {
        setStavka(stavka);
        setNapomena(stavka.napomena!);
        setBrojSale(stavka.brojSale!.toString());
        setIzabranaAktivnost(stavka.aktivnost!);
    };

    const unsetUnosStavke = () => {
        setStavka(undefined);
        setBrojSale("");
        setNapomena("");
    };

    const updateStavka = () => {
        if (
            !izabranaAktivnost ||
            brojSale.length === 0 ||
            napomena.length === 0
        ) {
            setNotification("Molim Vas popunite sva polja stavke!");
            return;
        }

        const updatedStavka: StavkaPlanaDogadjajaDto = {
            redniBrojStavke: stavka!.redniBrojStavke,
            aktivnost: izabranaAktivnost,
            brojSale: Number(brojSale),
            napomena: napomena,
        };

        let stavkeArray = stavke;
        let stavkaIndex: undefined | number = 0;

        stavkeArray.forEach((element, index) => {
            if (element.redniBrojStavke === updatedStavka.redniBrojStavke) {
                stavkaIndex = index;
            }
        });

        if (stavkaIndex === undefined) {
            setNotification("Doslo je do greške pri ažuriranju stavke!");
            unsetUnosStavke();
            return;
        }

        stavkeArray[stavkaIndex] = updatedStavka;
        setStavke(stavkeArray);

        console.log(updatedStavka);
        console.log(stavkeArray);

        unsetUnosStavke();
    };

    return notification.length === 0 ? (
        <div className="izmena-plana-dogadjaja">
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
            <div className="datumi">
                <div className="field">
                    <p>Datum početka:</p>
                    <input
                        type="date"
                        value={formatDate(pocetak!)}
                        onChange={(e) => {
                            setPocetak(new Date(e.target.value));
                        }}
                    />
                </div>
                <div className="field">
                    <p>Datum završetka:</p>
                    <input
                        type="date"
                        value={formatDate(zavrsetak!)}
                        onChange={(e) => {
                            setZavrsetak(new Date(e.target.value));
                        }}
                    />
                </div>
            </div>
            <div className="stanja">
                <div className="stanje">
                    <input
                        type="checkbox"
                        disabled={stanje !== "popunjen"}
                        checked={proveren}
                        onClick={() => {
                            setProveren(!proveren);
                        }}
                    />
                    <p>Proveren</p>
                </div>
                <div className="stanje">
                    <input
                        type="checkbox"
                        disabled={stanje !== "proveren"}
                        checked={validiran}
                        onClick={() => {
                            setValidiran(!validiran);
                        }}
                    />
                    <p>Validiran</p>
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
                <div className="btns">
                    <button
                        className="btn"
                        onClick={() => {
                            addStavka();
                        }}
                        disabled={stavka !== undefined}
                        style={
                            stavka !== undefined
                                ? { cursor: "default", opacity: "1" }
                                : {}
                        }
                    >
                        Ubaci stavku
                    </button>
                    <button
                        className="btn"
                        disabled={stavka === undefined}
                        style={
                            stavka === undefined
                                ? { cursor: "default", opacity: "1" }
                                : {}
                        }
                        onClick={() => {
                            updateStavka();
                        }}
                    >
                        Izmeni stavku
                    </button>
                    <button
                        className="btn"
                        disabled={brojSale.length === 0}
                        style={
                            brojSale.length === 0
                                ? { cursor: "default", opacity: "1" }
                                : {}
                        }
                        onClick={() => {
                            unsetUnosStavke();
                        }}
                    >
                        Otkaži
                    </button>
                </div>
            </div>
            <div className="stavke">
                <p>Unete stavke:</p>
                <div className="table">
                    <table id="header">
                        <thead>
                            <tr>
                                <th style={{ border: "none" }}></th>
                                <th style={{ border: "none" }}></th>
                                <th style={{ borderLeft: "solid 1px black" }}>
                                    RB Stavke
                                </th>
                                <th>Naziv aktivnosti</th>
                                <th>Broj sale</th>
                                <th>Napomena</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="table-wrapper">
                        <table>
                            <tbody>
                                {stavke.map((stavka, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        removeStavka(index);
                                                    }}
                                                >
                                                    izbriši
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setStavkaZaIzmenu(
                                                            stavka
                                                        );
                                                    }}
                                                >
                                                    izaberi
                                                </button>
                                            </td>
                                            <td id="redni-broj">
                                                {stavka.redniBrojStavke}
                                            </td>
                                            <td>{stavka.aktivnost?.naziv}</td>
                                            <td>{stavka.brojSale}</td>
                                            <td>{stavka.napomena} </td>
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
                        Potvrdi izmene
                    </div>
                    <div
                        className="btn"
                        onClick={() => {
                            setIsChangeVisible(false);
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

export default IzmenaPlanaDogadjaja;
