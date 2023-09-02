import { useEffect, useState } from "react";
import axios from "axios";

import "./PregledFirmi.scss";

import { FirmaDto } from "../../../../utils/dtos";

import IzmenaFirme from "../izmena-firme/IzmenaFirme";

const PregledFirmi = () => {
    const [naziv, setNaziv] = useState<string>("");
    const [visibleData, setVisibleData] = useState<FirmaDto[]>([]);

    const [isChangeVisible, setIsChangeVisible] = useState<boolean>(false);
    const [changeFirma, setChangeFirma] = useState<FirmaDto>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/firma`);
                setVisibleData(response.data);
            } catch (e) {
                setVisibleData([]);
            }
        };

        fetchData();
    }, [isChangeVisible]);

    const findMatches = async () => {
        const response = await axios.get(
            `http://localhost:4500/firma/${naziv}`
        );

        setVisibleData(response.data);
    };

    const formatDate = (date: Date): string => {
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
                                                setChangeFirma(
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
        <IzmenaFirme
            firma={changeFirma}
            setIsChangeVisible={setIsChangeVisible}
        />
    );
};

export default PregledFirmi;
