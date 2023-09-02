import { FirmaDto, PlanDogadjajaDataDto } from "./dtos";

interface notificationProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

interface izmenaFirmeProps {
    firma: FirmaDto;
    setIsChangeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface izmenaPlanaDogadjaja {
    planDogadjaja: PlanDogadjajaDataDto;
    setIsChangeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export {
    type notificationProps,
    type izmenaFirmeProps,
    type izmenaPlanaDogadjaja,
};
