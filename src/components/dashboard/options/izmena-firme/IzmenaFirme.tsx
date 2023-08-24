import { FC, useEffect, useState } from "react";
import axios from "axios";

import "./IzmenaFirme.scss";

import { drzave, gradovi } from "../../../../utils/consts";
import { FirmaDto } from "../../../../utils/dtos";

import { izmenaFirmeProps } from "../../../../utils/props";

import Notification from "../../../notifications/Notification";

const IzmenaFirme: FC<izmenaFirmeProps> = ({ firma, setIsChangeVisible }) => {
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

    const formatDate = (dateString: string): string => {
        let date = new Date(dateString);

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

    useEffect(() => {
        setIzabranaDrzava(firma.drzava!);
        setIzabraniGrad(firma.grad!);
        setImeFirme(firma.nazivFirme!);
        setMaticni(firma.maticniBroj!);
        setDate(formatDate(firma.datumOsnivanja!.toString()));
    }, []);

    return (
        <div className="izmena-firme">
            {notification.length === 0 && (
                <div className="form">
                    <div className="close-row">
                        <div
                            className="btn"
                            onClick={() => {
                                setIsChangeVisible(false);
                            }}
                        >
                            X
                        </div>
                    </div>
                    <div className="upper-part">
                        <div className="drzava-input">
                            <p>Država:</p>
                            <select
                                name="drzava-select"
                                id="drzava-select"
                                value={izabranaDrzava}
                                onChange={(e) => {
                                    const izabrana =
                                        e.target.value.toUpperCase();
                                    setIzabranaDrzava(izabrana);
                                    setMoguciGradovi(
                                        gradovi
                                            .filter(
                                                (grad) =>
                                                    grad.drzava.toUpperCase() ===
                                                    izabrana
                                            )
                                            .map((element) => element.grad)
                                    );
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
                            <input
                                type="text"
                                disabled={true}
                                value={firma.idFirme}
                            />
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
                                const izmena: FirmaDto = {
                                    idFirme: firma.idFirme,
                                    drzava: izabranaDrzava.toUpperCase(),
                                    grad: izabraniGrad.toUpperCase(),
                                    nazivFirme: imeFirme.toUpperCase(),
                                    maticniBroj: maticni.toUpperCase(),
                                    datumOsnivanja: new Date(date),
                                };

                                if (!checkValues()) {
                                    setNotification(
                                        "Molim Vas popunite sva ponudjena polja!"
                                    );
                                    return;
                                }

                                try {
                                    await axios.put(
                                        "http://localhost:4500/firma",
                                        izmena
                                    );
                                    setNotification(
                                        "Firma je uspešno sačuvana"
                                    );
                                } catch (e) {
                                    setNotification(
                                        "Došlo je do greške pri čuvanju izmena firme!"
                                    );
                                    return;
                                }
                            }}
                        >
                            Izmeni firmu
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

export default IzmenaFirme;
