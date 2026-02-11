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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
          >
            <option value="">Select business type</option>
            {BUSINESS_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.icon} {type.label}</option>
            ))}
          </select>
          {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Card Sales Volume ($)</label>
          <input
            type="number"
            name="monthlyVolume"
            value={formData.monthlyVolume}
            onChange={handleChange}
            placeholder="e.g., 50000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
          />
          {errors.monthlyVolume && <p className="text-red-500 text-sm mt-1">{errors.monthlyVolume}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Average Ticket Size ($)</label>
          <input
            type="number"
            name="avgTicket"
            value={formData.avgTicket}
            onChange={handleChange}
            placeholder="e.g., 75"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Monthly Processing Fees ($)</label>
          <input
            type="number"
            name="monthlyFees"
            value={formData.monthlyFees}
            onChange={handleChange}
            placeholder="e.g., 1500"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
          />
          {errors.monthlyFees && <p className="text-red-500 text-sm mt-1">{errors.monthlyFees}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-brand-primary hover:bg-brand-dark text-white font-bold text-lg rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Calculate My Savings
        </button>
      </form>
    </div>
  );
}
