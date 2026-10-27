import Link from "next/link";
import ESNTurkiyeLogo from "../../logos/ESNTurkiyeLogo";

interface LogoSectionProps {
    isMobile?: boolean;
}

export const LogoSection = ({ isMobile = false }: LogoSectionProps) => {
    return (
        <div>
            <Link href="/" className="flex items-center">
                <ESNTurkiyeLogo isMobile={isMobile} />
            </Link>
        </div>
    );
};
