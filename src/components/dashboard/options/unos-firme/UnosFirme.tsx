import { useEffect, useState } from "react";

import { drzave, gradovi } from "../../../../utils/consts";

import "./UnosFirme.scss";
import { FirmaDto } from "../../../../utils/dtos";
import axios from "axios";

const UnosFirme = () => {
    const [moguciGradovi, setMoguciGradovi] = useState<string[]>([
        "Beograd",
        "Kragujevac",
        "Kraljevo",
        "Kruševac",
        "Novi Sad",
    ]);

    const [izabranaDrzava, setIzabranaDrzava] = useState<string>("Srbija");
    const [izabraniGrad, setIzabraniGrad] = useState<string>("Beograd");
    const [imeFirme, setImeFirme] = useState<string>("");
    const [maticni, setMaticni] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const current = new Date();

        let month: string = "";

        if (current.getMonth() + 1 / 10 === 1) {
            month = (current.getMonth() + 1).toString();
        } else {
            month = `0${(current.getMonth() + 1).toString()}`;
        }

        setDate(`${current.getFullYear()}-${month}-${current.getDate()}`);
    }, []);

    return (
        <div className="UnosFirme">
            <div className="form">
                <div className="upper-part">
                    <div className="drzava-input">
                        <p>Država:</p>
                        <select
                            name="drzava-select"
                            id="drzava-select"
                            value={izabranaDrzava}
                            onChange={(e) => {
                                const izabrana = e.target.value.toUpperCase();
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
                            const firma: FirmaDto = {
                                drzava: izabranaDrzava,
                                grad: izabraniGrad,
                                nazivFirme: imeFirme,
                                maticniBroj: maticni,
                                datumOsnivanja: new Date(date),
                            };

                            try {
                                await axios.post(
                                    "http://localhost:4500/firma",
                                    firma
                                );
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        Sačuvaj firmu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnosFirme;
