const drzave: string[] = ["Srbija", "Bugarska", "Crna Gora"];

interface gradToDrzava {
    drzava: string;
    grad: string;
}

const gradovi: gradToDrzava[] = [
    { drzava: "Srbija", grad: "Beograd" },
    { drzava: "Srbija", grad: "Kragujevac" },
    { drzava: "Srbija", grad: "Kraljevo" },
    { drzava: "Srbija", grad: "Kruševac" },
    { drzava: "Srbija", grad: "Novi Sad" },
    { drzava: "Bugarska", grad: "Sofija" },
    { drzava: "Bugarska", grad: "Plovdin" },
    { drzava: "Bugarska", grad: "Varna" },
    { drzava: "Crna Gora", grad: "Nikšić" },
    { drzava: "Crna Gora", grad: "Budva" },
    { drzava: "Crna Gora", grad: "Herceg Novi" },
];

export { type gradToDrzava, drzave, gradovi };
