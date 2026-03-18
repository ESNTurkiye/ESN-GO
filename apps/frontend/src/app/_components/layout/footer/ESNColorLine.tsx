const COLOR_LINE_SEGMENTS = Array.from(
    { length: 20 },
    (_, segmentIndex) => `segment-${segmentIndex}`,
);

export const ESNColorLine = () => {
    return (
        <div
            className="w-full h-1 overflow-hidden"
            role="presentation"
            aria-hidden="true"
        >
            <div className="flex h-full">
                {COLOR_LINE_SEGMENTS.map((segmentId) => (
                    <div key={segmentId} className="flex h-full">
                        <div className="w-12 sm:w-16 bg-esn-cyan" />
                        <div className="w-1" />
                        <div className="w-12 sm:w-16 bg-esn-magenta" />
                        <div className="w-1" />
                        <div className="w-12 sm:w-16 bg-esn-orange" />
                        <div className="w-1" />
                        <div className="w-12 sm:w-16 bg-esn-green" />
                        <div className="w-1" />
                        <div className="w-12 sm:w-16 bg-esn-dark-blue" />
                        <div className="w-1" />
                    </div>
                ))}
            </div>
        </div>
    );
};
