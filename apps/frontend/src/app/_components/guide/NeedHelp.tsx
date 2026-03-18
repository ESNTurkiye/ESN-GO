import Button from "@/components/ui/Button";

export default function NeedHelp() {
    return (
        <section className="mt-12 md:mt-16 bg-esn-dark-blue rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-oswald font-bold text-white mb-3">
                Need more help?
            </h2>
            <p className="font-lato text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-6">
                Can&apos;t find what you&apos;re looking for? Reach out to your
                local ESN section or contact us directly. We&apos;re here to
                help you make the most of your Erasmus experience in Türkiye.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                    variant="cyan"
                    size="md"
                    href="mailto:info@esnturkiye.org"
                    aria-label="Contact ESN Türkiye via email"
                >
                    Contact ESN Türkiye
                </Button>
                <Button
                    variant="ghost"
                    size="md"
                    className="!text-white hover:!text-esn-cyan border border-white/20 hover:border-esn-cyan/40"
                    href="https://esnturkiye.org"
                    aria-label="Visit ESN Türkiye website"
                >
                    Visit Website
                </Button>
            </div>
        </section>
    );
}
