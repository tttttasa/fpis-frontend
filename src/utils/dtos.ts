interface FirmaDto {
    idFirme?: number;
    drzava?: string;
    grad?: string;
    nazivFirme?: string;
    maticniBroj?: string;
    datumOsnivanja?: Date;
}

interface PMDto {
    idProjektnogMenadzera?: number;
    imeProjektnogMenadzera?: string;
    prezimeProjektnogMenadzera?: string;
}

interface SpisakGostijuDto {
    idSpiska?: number;
    brojGostiju?: number;
    imenaGostiju?: string;
    prezimenaGostiju?: string;
}

interface AktivnostDto {
    naziv?: string;
    termin?: Date;
}

interface StavkaPlanaDogadjajaDto {
    idPlanaDogadjaja?: number;
    redniBrojStavke?: number;
    brojSale?: number;
    napomena?: string;
    aktivnost?: AktivnostDto;
}

interface PlanDogadjajaDto {
    idPlanaDogadjaja?: number;
    idProjektnogMenadzera?: number;
    idSpiska?: number;
}

interface PlanDogadjajaDataDto {
    planDogadjaja: PlanDogadjajaDto;
    stavke: StavkaPlanaDogadjajaDto[];
}

export {
    type FirmaDto,
    type PMDto,
    type SpisakGostijuDto,
    type AktivnostDto,
    type StavkaPlanaDogadjajaDto,
    type PlanDogadjajaDataDto,
};
