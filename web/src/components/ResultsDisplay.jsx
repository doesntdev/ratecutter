import { formatPercentage, formatCurrency } from '../utils/calculations';

export default function ResultsDisplay({ results, onRestart, onSave }) {
  if (!results) return null;
  
  const { effectiveRate, benchmark, proposedRate, savings } = results;

  const getRatingColor = (category) => {
    switch (category) {
      case 'good':
        return 'bg-green-100 text-brand-dark border-green-300';
      case 'average':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Rate Analysis</h2>
        <p className="text-gray-600">Based on your processing data</p>
      </div>

      {/* Current Rate Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Your Current Effective Rate</p>
          <div className="text-5xl font-bold text-gray-900">{formatPercentage(effectiveRate)}</div>
          <div className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium border ${getRatingColor(benchmark.category)}`}>
            {benchmark.label}
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm">{benchmark.message}</p>
      </div>

      {/* Floor Rate Message - Rate below 2.75% */}
      {effectiveRate < 2.75 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-6 mb-6 border border-green-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-brand-dark font-semibold text-lg mb-2">You've got a great rate already!</p>
            <p className="text-brand-dark">But let's see how we can make it even better.</p>
          </div>
        </div>
      )}

      {/* No Savings Message */}
      {savings.monthly <= 0 && effectiveRate >= 2.75 && (
        <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
          <p className="text-center text-brand-dark font-medium">You're already getting a competitive rate!</p>
          <p className="text-center text-brand-dark text-sm mt-2">Your current rate is already below market average.</p>
        </div>
      )}

      {/* CTA Buttons - Show Save button if there's savings OR if rate is below floor */}
      <div className="space-y-3">
        {(savings.monthly > 0 || effectiveRate < 2.75) && (
          <button
            onClick={onSave}
            className="w-full py-3 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-lg transition-colors shadow-md"
          >
            {effectiveRate < 2.75 ? "Let's Optimize Further" : "Save My Proposal"}
          </button>
        )}
        <button
          onClick={onRestart}
          className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Start Over
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">No obligation. Your information is secure and will not be shared.</p>
      </div>
    </div>
  );
}
