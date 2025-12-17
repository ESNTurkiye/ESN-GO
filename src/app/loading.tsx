export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block relative w-20 h-20">
          {/* ESN Colors Loading Spinner */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div 
              className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-esn-cyan border-r-esn-magenta rounded-full animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
          </div>
        </div>
        <p className="mt-4 text-esn-dark-blue font-lato font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
}

