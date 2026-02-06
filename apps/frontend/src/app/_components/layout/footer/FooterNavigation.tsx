import { useState } from "react";
import { MobileFooterColumn } from "./MobileFooterColumn";
import { DesktopFooterColumn } from "./DesktopFooterColumn";
import { FOOTER_COLUMNS } from "./constants";

export const FooterNavigation = () => {
    const [openSection, setOpenSection] = useState<number | null>(null);

    const toggleSection = (index: number) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <nav className="mb-12" aria-label="Footer navigation">
            <div className="md:hidden space-y-2">
                {FOOTER_COLUMNS.map((column, index) => (
                    <MobileFooterColumn
                        key={index}
                        column={column}
                        isOpen={openSection === index}
                        onToggle={() => toggleSection(index)}
                    />
                ))}
            </div>

            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {FOOTER_COLUMNS.map((column, index) => (
                    <DesktopFooterColumn key={index} column={column} />
                ))}
            </div>
        </nav>
    );
};