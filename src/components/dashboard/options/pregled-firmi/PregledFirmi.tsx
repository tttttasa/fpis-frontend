import { useEffect, useState } from "react";

import "./PregledFirmi.scss";

import { FirmaDto } from "../../../../utils/dtos";
import axios from "axios";

import { drzave, gradovi } from "../../../../utils/consts";

const PregledFirmi = () => {
    const [naziv, setNaziv] = useState<string>("");
    const [visibleData, setVisibleData] = useState<FirmaDto[]>([]);

    const [isChangeVisible, setIsChangeVisible] = useState<boolean>(false);

    const [moguciGradovi, setMoguciGradovi] = useState<string[]>([
        "Beograd",
        "Kragujevac",
        "Kraljevo",
        "Kruševac",
        "Novi Sad",
    ]);

    const [idDrzave, setIdDrzave] = useState<number>(0);
    const [izabranaDrzava, setIzabranaDrzava] = useState<string>("Srbija");
    const [izabraniGrad, setIzabraniGrad] = useState<string>("Beograd");
    const [idFirme, setIdFirme] = useState<number>(0);
    const [imeFirme, setImeFirme] = useState<string>("");
    const [maticni, setMaticni] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/firma`);
                setVisibleData(response.data);
                setVisibleData(response.data);
            } catch (e) {
                setVisibleData([]);
            }
        };

        fetchData();
    }, []);

    const findMatches = async () => {
        const response = await axios.get(
            `http://localhost:4500/firma/${naziv}`
        );

        setVisibleData(response.data);
    };

    const setUpdateFirmaForm = (firma: FirmaDto) => {
        setIdDrzave(firma.idFirme!);
        setIzabranaDrzava(firma.drzava!);
        setIzabraniGrad(firma.grad!);
        setIdFirme(firma.idFirme!);
        setImeFirme(firma.nazivFirme!);
        setMaticni(firma.maticniBroj!);
        setDate(formatDate(firma.datumOsnivanja!));

        setMoguciGradovi(
            gradovi
                .filter(
                    (grad) =>
                        grad.drzava.toUpperCase() ===
                        firma.drzava!.toUpperCase()
                )
                .map((element) => element.grad)
        );
    };

    const formatDate = (date: Date): string => {
        date = new Date(date);

        let month: string = "";

        if (date.getMonth() + 1 / 10 === 1) {
            month = (date.getMonth() + 1).toString();
        } else {
            month = `0${(date.getMonth() + 1).toString()}`;
        }

        return `${date.getFullYear()}-${month}-${date.getDate()}`;
    };

    return !isChangeVisible ? (
        <div className="pregled-firmi">
            <div className="upper">
                <div className="left">
                    <p>Uneti kriterijume pretrage:</p>
                    <input
                        type="text"
                        placeholder="Ime firme"
                        value={naziv}
                        onChange={(e) => {
                            setNaziv(e.target.value);
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
                            <th>ID firme</th>
                            <th>Naziv firme</th>
                            <th>Matični broj</th>
                            <th>Datum osnivanja</th>
                            <th>Država</th>
                            <th>Grad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((firmaData, index) => {
                            return (
                                <tr>
                                    <td>{firmaData.idFirme}</td>
                                    <td>{firmaData.nazivFirme}</td>
                                    <td>{firmaData.maticniBroj}</td>
                                    <td>
                                        {formatDate(firmaData.datumOsnivanja!)}
                                    </td>
                                    <td>{firmaData.drzava}</td>
                                    <td>{firmaData.grad}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setUpdateFirmaForm(
                                                    visibleData[index]
                                                );
                                                setIsChangeVisible(true);
                                            }}
                                        >
                                            Izmeni
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="izmena-firme">
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
                        <input type="text" disabled={true} value={idFirme} />
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
                                idFirme: idDrzave,
                                drzava: izabranaDrzava.toUpperCase(),
                                grad: izabraniGrad.toUpperCase(),
                                nazivFirme: imeFirme.toUpperCase(),
                                maticniBroj: maticni.toUpperCase(),
                                datumOsnivanja: new Date(date),
                            };

                            try {
                                await axios.put(
                                    "http://localhost:4500/firma",
                                    firma
                                );
                                const newData = await axios.get(
                                    "http://localhost:4500/firma"
                                );
                                setVisibleData(newData.data);
                                setIsChangeVisible(false);
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        Izmeni firmu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PregledFirmi;
