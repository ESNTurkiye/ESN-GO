export const ESNColorLine = () => {
    return (
        <div className="w-full h-1 overflow-hidden" role="presentation" aria-hidden="true">
            <div className="flex h-full">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex h-full">
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