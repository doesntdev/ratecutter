import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LeadCapture({ calculationData, onSaved }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    businessName: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setError(null);

    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([{
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        business_name: formData.businessName,
        monthly_volume: calculationData?.input?.monthlyVolume,
        monthly_fees: calculationData?.input?.monthlyFees,
        effective_rate: calculationData?.effectiveRate,
        proposed_rate: calculationData?.proposedRate,
        monthly_savings: calculationData?.savings?.monthly,
        annual_savings: calculationData?.savings?.annual,
        business_type: calculationData?.input?.businessType
      }]);

    if (supabaseError) {
      setError('Failed to save. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    if (onSaved) onSaved();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Proposal Saved!</h2>
          <p className="text-gray-600">We'll be in touch soon with your personalized savings proposal.</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-brand-primary hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors"
        >
          Calculate Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Save Your Proposal</h2>
        <p className="text-gray-600">Enter your email to receive your personalized savings proposal</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@business.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Your Business LLC"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-brand-primary hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save My Proposal'}
        </button>
      </form>

      <p className="text-xs text-center text-gray-400 mt-4">
        By submitting, you agree to receive emails about your proposal. We never share your information.
      </p>
    </div>
  );
}
