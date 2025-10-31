export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl font-bold text-cyan-400 mb-8">Log a New Match</h1>
              <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg mx-auto animate-pulse">
                <div className="mb-6"><div className="h-6 bg-gray-700 rounded w-1/3"></div></div>
                <div className="mb-6"><div className="h-10 bg-gray-700 rounded"></div></div>
                <div className="mb-6"><div className="h-6 bg-gray-700 rounded w-1/3"></div></div>
                <div className="mb-6"><div className="h-10 bg-gray-700 rounded"></div></div>
                <div className="mb-6"><div className="h-6 bg-gray-700 rounded w-1/3"></div></div>
                <div className="mb-6"><div className="h-10 bg-gray-700 rounded"></div></div>
                <div className="mb-6"><div className="h-6 bg-gray-700 rounded w-1/3"></div></div>
                <div className="mb-6"><div className="h-10 bg-gray-700 rounded"></div></div>
                <div className="h-12 bg-cyan-500 rounded"></div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-cyan-400 mb-8">Logged Matches</h1>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
