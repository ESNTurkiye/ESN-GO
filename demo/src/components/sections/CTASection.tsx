import Button from '../ui/Button';

export default function CTASection() {
  return (
    <section className="py-20 bg-linear-to-br from-esn-magenta via-[#AE2573] to-esn-dark-blue">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-6 uppercase">
          Ready to Start Your Adventure?
        </h2>
        <p className="text-xl text-white/90 font-lato mb-10 leading-relaxed">
          Join thousands of Erasmus students exploring Türkiye. 
          Connect with the community, discover hidden gems, and make unforgettable memories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cyan" size="lg" className="w-full sm:w-auto">
            Create Free Account
          </Button>
          <Button variant="ghost" size="lg" className="w-full sm:w-auto bg-white text-esn-dark-blue hover:bg-gray-100">
            Browse as Guest
          </Button>
        </div>
        <p className="mt-8 text-white/70 font-lato text-sm">
          #ErasmusGeneration • #ThisIsESN • Unity in Diversity
        </p>
      </div>
    </section>
  );
}