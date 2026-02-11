import { useState } from 'react';
import { BUSINESS_TYPES } from '../utils/calculations';

export default function QuickInput({ onSubmit }) {
  const [formData, setFormData] = useState({
    businessType: '',
    monthlyVolume: '',
    avgTicket: '',
    monthlyFees: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessType) newErrors.businessType = 'Required';
    if (!formData.monthlyVolume || parseFloat(formData.monthlyVolume) <= 0) {
      newErrors.monthlyVolume = 'Enter valid amount';
    }
    if (!formData.monthlyFees || parseFloat(formData.monthlyFees) < 0) {
      newErrors.monthlyFees = 'Enter valid fees';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        businessType: formData.businessType,
        monthlyVolume: parseFloat(formData.monthlyVolume),
        avgTicket: parseFloat(formData.avgTicket) || 0,
        monthlyFees: parseFloat(formData.monthlyFees)
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          RateCutter
        </h2>
        <p className="text-slate-600">
          See how much you could save on credit card processing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Business Type
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select business type</option>
            {BUSINESS_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Monthly Card Sales Volume ($)
          </label>
          <input
            type="number"
            name="monthlyVolume"
            value={formData.monthlyVolume}
            onChange={handleChange}
            placeholder="e.g., 50000"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.monthlyVolume && <p className="text-red-500 text-sm mt-1">{errors.monthlyVolume}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Average Ticket Size ($)
          </label>
          <input
            type="number"
            name="avgTicket"
            value={formData.avgTicket}
            onChange={handleChange}
            placeholder="e.g., 75"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Total Monthly Processing Fees ($)
          </label>
          <input
            type="number"
            name="monthlyFees"
            value={formData.monthlyFees}
            onChange={handleChange}
            placeholder="e.g., 1500"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.monthlyFees && <p className="text-red-500 text-sm mt-1">{errors.monthlyFees}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate My Savings
        </button>
      </form>
    </div>
  );
}
