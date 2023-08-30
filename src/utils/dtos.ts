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
    idAktivnost?: number;
    naziv?: string;
    termin?: Date;
}

interface StavkaPlanaDogadjajaDataDto {
    idPlanaDogadjaja?: number;
    redniBrojStavke?: number;
    brojSale?: number;
    napomena?: string;
    idAktivnosti?: number;
}

interface StavkaPlanaDogadjajaViewDto {
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
    stavke: StavkaPlanaDogadjajaDataDto[];
}

interface PlanDogadjajaViewDto {
    planDogadjaja: PlanDogadjajaDto;
    stavke: StavkaPlanaDogadjajaViewDto[];
}

export {
    type FirmaDto,
    type PMDto,
    type SpisakGostijuDto,
    type AktivnostDto,
    type StavkaPlanaDogadjajaDataDto as StavkaPlanaDogadjajaDto,
    type StavkaPlanaDogadjajaViewDto,
    type PlanDogadjajaDataDto,
    type PlanDogadjajaViewDto,
};
