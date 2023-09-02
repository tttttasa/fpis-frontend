import { useEffect, useState } from "react";
import axios from "axios";

import "./UnosFirme.scss";

import { drzave, gradovi } from "../../../../utils/consts";
import { FirmaDto } from "../../../../utils/dtos";

import Notification from "../../../notifications/Notification";

const UnosFirme = () => {
    const [izabranaDrzava, setIzabranaDrzava] = useState<string>("Srbija");
    const [izabraniGrad, setIzabraniGrad] = useState<string>("Beograd");
    const [moguciGradovi, setMoguciGradovi] = useState<string[]>([
        "Beograd",
        "Kragujevac",
        "Kraljevo",
        "Kruševac",
        "Novi Sad",
    ]);

    const [imeFirme, setImeFirme] = useState<string>("");
    const [maticni, setMaticni] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const [notification, setNotification] = useState<string>("");

    const formatDate = (date: Date): string => {
        let month: string = "";

        if (date.getMonth() + 1 / 10 === 1) {
            month = (date.getMonth() + 1).toString();
        } else {
            month = `0${(date.getMonth() + 1).toString()}`;
        }

        return `${date.getFullYear()}-${month}-${date.getDate()}`;
    };

    const checkValues = () => {
        return imeFirme.length != 0 && maticni.length != 0 && date.length != 0;
    };

    const resetInputs = () => {
        setImeFirme("");
        setMaticni("");
        setDate(formatDate(new Date()));
    };

    const izborGrada = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const izabrana = e.target.value.toUpperCase();
        setIzabranaDrzava(izabrana);
        setMoguciGradovi(
            gradovi
                .filter((grad) => grad.drzava.toUpperCase() === izabrana)
                .map((element) => element.grad)
        );
    };

    const saveFirma = async () => {
        const firma: FirmaDto = {
            drzava: izabranaDrzava.toUpperCase(),
            grad: izabraniGrad.toUpperCase(),
            nazivFirme: imeFirme.toUpperCase(),
            maticniBroj: maticni.toUpperCase(),
            datumOsnivanja: new Date(date),
        };

        if (!checkValues()) {
            setNotification("Molim Vas popunite sva data polja!");
        } else {
            try {
                await axios.post("http://localhost:4500/firma", firma);
                setNotification("Firma je uspešno sačuvan!");
                resetInputs();
            } catch (e) {
                setNotification("Došlo je do greške pri čuvanju firme!");
            }
        }
    };

    useEffect(() => {
        const current = new Date();

        let dateString = formatDate(current);

        setDate(dateString);
    }, []);

    return (
        <div className="UnosFirme">
            {notification.length === 0 && (
                <div className="form">
                    <div className="upper-part">
                        <div className="drzava-input">
                            <p>Država:</p>
                            <select
                                name="drzava-select"
                                id="drzava-select"
                                value={izabranaDrzava}
                                onChange={(e) => {
                                    izborGrada(e);
                                }}
                            >
                                {drzave.map((drzava) => {
                                    return (
                                        <option value={drzava.toUpperCase()}>
                                            {drzava.toUpperCase()}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="grad-input">
                            <p>Grad:</p>
                            <select
                                name="drzava-select"
                                id="drzava-select"
                                value={izabraniGrad}
                                onChange={(e) => {
                                    setIzabraniGrad(e.target.value);
                                }}
                            >
                                {moguciGradovi.map((grad) => {
                                    return (
                                        <option value={grad.toUpperCase()}>
                                            {grad.toUpperCase()}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="lower-part">
                        <div className="id-firme-input">
                            <p>ID firme:</p>
                            <input type="text" disabled={true} />
                        </div>
                        <div className="naziv-firme-input">
                            <p>Naziv firme:</p>
                            <input
                                type="text"
                                value={imeFirme}
                                onChange={(e) => {
                                    setImeFirme(e.target.value);
                                }}
                            />
                        </div>
                        <div className="maticni-broj-input">
                            <p>Matični broj:</p>
                            <input
                                type="text"
                                value={maticni}
                                onChange={(e) => {
                                    setMaticni(e.target.value);
                                }}
                            />
                        </div>
                        <div className="datum-osnivanja-input">
                            <p>Datum osnivanja:</p>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            onClick={async () => {
                                await saveFirma();
                            }}
                        >
                            Sačuvaj firmu
                        </button>
                    </div>
                </div>
            )}
            {notification.length != 0 && (
                <Notification text={notification} setText={setNotification} />
            )}
        </div>
    );
};

export default UnosFirme;
