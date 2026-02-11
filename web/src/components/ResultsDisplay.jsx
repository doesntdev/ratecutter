import { formatPercentage, formatCurrency } from '../utils/calculations';

export default function ResultsDisplay({ results, onRestart, onSave }) {
  if (!results) return null;

  const { effectiveRate, benchmark, proposedRate, savings } = results;

  const getRatingColor = (category) => {
    switch (category) {
      case 'good': return 'bg-green-100 text-green-800 border-green-300';
      case 'average': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Your Rate Analysis
        </h2>
        <p className="text-slate-600">
          Based on your processing data
        </p>
      </div>

      {/* Current Rate Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border">
        <div className="text-center mb-4">
          <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
            Your Current Effective Rate
          </p>
          <div className="text-5xl font-bold text-slate-800">
            {formatPercentage(effectiveRate)}
          </div>
          <div className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium border ${getRatingColor(benchmark.category)}`}>
            {benchmark.label}
          </div>
        </div>
        <p className="text-center text-slate-600 text-sm">
          {benchmark.message}
        </p>
      </div>

      {/* Savings Proposal */}
      {savings.monthly > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 mb-6 border border-blue-200">
          <div className="text-center mb-4">
            <p className="text-sm text-blue-600 uppercase tracking-wide mb-1">
              Proposed Rate
            </p>
            <div className="text-4xl font-bold text-blue-700">
              {formatPercentage(proposedRate)}
            </div>
            <p className="text-blue-600 text-sm mt-1">
              Save {formatPercentage(savings.rateDifference)} on every transaction
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-slate-500 mb-1">Monthly Savings</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(savings.monthly)}
              </p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-slate-500 mb-1">Annual Savings</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(savings.annual)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Savings Message */}
      {savings.monthly <= 0 && (
        <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
          <p className="text-center text-green-800 font-medium">
            You're already getting a competitive rate!
          </p>
          <p className="text-center text-green-700 text-sm mt-2">
            Your current rate is already below market average.
          </p>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="space-y-3">
        {savings.monthly > 0 && (
          <button
            onClick={onSave}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save My Proposal
          </button>
        )}
        <button
          onClick={onRestart}
          className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
        >
          Start Over
        </button>
      </div>

      {/* Trust Badge */}
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400">
          No obligation. Your information is secure and will not be shared.
        </p>
      </div>
    </div>
  );
}
