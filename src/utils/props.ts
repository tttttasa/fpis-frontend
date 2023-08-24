import { FirmaDto } from "./dtos";

interface navbarProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface dashboardProps {
    page: number;
}

interface notificationProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

interface izmenaFirmeProps {
    firma: FirmaDto;
    setIsChangeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export {
    type navbarProps,
    type dashboardProps,
    type notificationProps,
    type izmenaFirmeProps,
};
