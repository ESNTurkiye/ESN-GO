export const getDesktopTranslate = (step: number): string => {
    switch (step) {
        case 0:
            return 'translateX(0px)';
        case 1:
            return 'translateX(calc(-1 * ((26% * 3) + (1.5rem * 3)) + ((100% - (26% * 3) - (1.5rem * 2)) / 2)))';
        case 2:
            return 'translateX(calc(-1 * ((26% * 6) + (1.5rem * 6)) + (100% - (26% * 3) - (1.5rem * 2))))';
        default:
            return 'translateX(0px)';
    }
};

export const getMobileTranslate = (index: number): string => {
    return `translateX(calc(-1 * (${index} * 85vw + ${index} * 16px) + (50% - 42.5vw)))`;
};

export const isPartialCard = (desktopStep: number, index: number): boolean => {
    if (desktopStep === 0) {
        return index === 3;
    } else if (desktopStep === 1) {
        return index === 2 || index === 6;
    } else if (desktopStep === 2) {
        return index === 5;
    }
    return false;
};