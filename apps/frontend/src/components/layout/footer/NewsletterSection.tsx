import Button from "../../ui/Button";

export const NewsletterSection = () => {
    return (
        <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-white/10">
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="fluid-heading-md font-oswald font-black mb-4  tracking-tight">
                    STAY IN THE LOOP
                </h3>
                <p className="text-white/70 font-lato text-base sm:text-lg mb-6 sm:mb-8">
                    Get weekly tips, event announcements, and exclusive ESNcard deals
                </p>
                <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <input
                        id="newsletter-email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        aria-required="true"
                        className="w-full sm:w-auto sm:min-w-[300px] lg:min-w-[400px] px-5 sm:px-6 py-3 sm:py-4 rounded-full text-[#333333] font-lato bg-white focus:outline-none focus:ring-4 focus:ring-[#EC008C]/30 shadow-[0px_4px_15px_rgba(0,0,0,0.2)] transition-all touch-target"
                    />
                    <Button
                        size="lg"
                        type="submit"
                        className="bg-[#EC008C] hover:bg-[#EC008C]/90 text-white font-bold rounded-full px-6 sm:px-8 py-3 sm:py-4 transition-transform hover:scale-105 whitespace-nowrap shadow-[0px_4px_15px_rgba(236,0,140,0.3)] touch-target"
                        aria-label="Subscribe to newsletter"
                    >
                        SUBSCRIBE
                    </Button>
                </form>
            </div>
        </div>
    );
};