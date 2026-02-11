import { useState } from 'react';
import QuickInput from './components/QuickInput';
import ResultsDisplay from './components/ResultsDisplay';
import LeadCapture from './components/LeadCapture';
import { runCalculations } from './utils/calculations';

function App() {
  const [step, setStep] = useState('input'); // 'input', 'results', 'capture'
  const [calculationData, setCalculationData] = useState(null);
  const [results, setResults] = useState(null);

  const handleInputSubmit = (data) => {
    setCalculationData(data);
    const calcResults = runCalculations(data);
    setResults(calcResults);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('input');
    setCalculationData(null);
    setResults(null);
  };

  const handleSave = () => {
    setStep('capture');
  };

  const handleSaved = () => {
    // Could redirect or show success
    setStep('input');
    setCalculationData(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-slate-800">RateCutter</span>
          </div>
          <nav className="hidden sm:flex space-x-6">
            <a href="#" className="text-slate-600 hover:text-slate-800">How It Works</a>
            <a href="#" className="text-slate-600 hover:text-slate-800">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {step === 'input' && (
            <QuickInput onSubmit={handleInputSubmit} />
          )}

          {step === 'results' && results && (
            <ResultsDisplay 
              results={results}
              onRestart={handleRestart}
              onSave={handleSave}
            />
          )}

          {step === 'capture' && (
            <LeadCapture 
              calculationData={calculationData}
              onSaved={handleSaved}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            RateCutter - Helping merchants find better processing rates
          </p>
          <p className="text-slate-400 text-xs mt-2">
            © 2026 RateCutter. All calculations are estimates.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
