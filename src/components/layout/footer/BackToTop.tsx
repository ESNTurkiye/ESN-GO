import Button from "../../ui/Button";
import { ArrowUpIcon } from "./icons";

export const BackToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex justify-center mb-8">
            <Button
                onClick={scrollToTop}
                variant="ghost"
                className="flex items-center gap-2 text-white/70 hover:text-white! transition-colors group"
                aria-label="Back to top"
            >
                <span className="font-lato text-sm uppercase tracking-wider">Back to top</span>
                <ArrowUpIcon className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
            </Button>
        </div>
    );
};