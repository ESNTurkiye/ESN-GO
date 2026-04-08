export default function ExperienceCard() {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-gray-200">
      
      <div className="h-40 bg-esn-cyan/10 overflow-hidden relative border-b border-esn-cyan/30">
        <div className="w-full h-full bg-esn-cyan/20 group-hover:scale-105 transition-transform duration-300" />
        {/* Placeholder for image */}
      </div>

      <div className="p-4 group-hover:bg-esn-dark-blue/5 transition-colors duration-300">
        <h3 className="font-semibold text-esn-dark-blue group-hover:text-esn-cyan transition-colors duration-300">Istanbul Nightlife</h3>
        <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
          Discover the best clubs in Kadıköy
        </p>
      </div>
    </div>
  );
}