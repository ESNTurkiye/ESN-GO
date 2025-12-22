import Image from "next/image";

export const LogoBranding = () => {
    return (
        <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 group">
                <div className="absolute inset-0 bg-[#EC008C] rounded-xl translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                <Image
                    src="https://babas-teknoloji.s3.eu-central-1.amazonaws.com/esn-go/images/web-esn-white.png"
                    alt="ESN Network logo"
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-contain"
                />
            </div>
            <div className="text-center lg:text-left">
                <div className="text-lg sm:text-xl font-lato font-bold">ESN GO</div>
                <div className="text-xs text-oswald text-white/60 tracking-wider">
                    ESN Türkiye
                </div>
            </div>
        </div>
    );
};