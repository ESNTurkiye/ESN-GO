export default function MapPlaceholder() {
  return (
    <div className="min-h-[680px] lg:min-h-[760px] bg-white rounded-[32px] flex items-center justify-center border border-esn-cyan/30 shadow-sm">
      <div className="text-center px-6 py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-esn-magenta rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-gray-600 font-medium text-lg">Interactive Map Coming Soon</span>
        <p className="text-gray-500 text-sm mt-2">Discover locations on the map</p>
      </div>
    </div>
  );
}