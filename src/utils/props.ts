interface navbarProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface dashboardProps {
    page: number;
}

export { type navbarProps, type dashboardProps };
