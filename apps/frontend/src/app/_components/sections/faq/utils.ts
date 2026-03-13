export const handleKeyDown = (
    e: React.KeyboardEvent,
    onActivate: () => void
) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate();
    }
};