import { useState } from "react";
import { FOOTER_COLUMNS } from "./constants";
import { DesktopFooterColumn } from "./DesktopFooterColumn";
import { MobileFooterColumn } from "./MobileFooterColumn";

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
                        key={column.title}
                        column={column}
                        isOpen={openSection === index}
                        onToggle={() => toggleSection(index)}
                    />
                ))}
            </div>

            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {FOOTER_COLUMNS.map((column) => (
                    <DesktopFooterColumn key={column.title} column={column} />
                ))}
            </div>
        </nav>
    );
};
