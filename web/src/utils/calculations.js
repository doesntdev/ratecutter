/**
 * RateCutter Calculation Engine
 * Handles effective rate calculations and savings proposals
 */

/**
 * Calculate effective rate from monthly fees and volume
 * @param {number} monthlyFees - Total monthly processing fees
 * @param {number} monthlyVolume - Total monthly card sales volume
 * @returns {number} - Effective rate as percentage (e.g., 2.85 for 2.85%)
 */
export function calculateEffectiveRate(monthlyFees, monthlyVolume) {
    if (!monthlyVolume || monthlyVolume <= 0) {
        return 0;
    }
    if (!monthlyFees || monthlyFees < 0) {
        return 0;
    }
    return parseFloat(((monthlyFees / monthlyVolume) * 100).toFixed(2));
}

/**
 * Get benchmark rating based on effective rate
 * @param {number} effectiveRate - The calculated effective rate
 * @returns {string} - 'good', 'average', or 'high'
 */
export function getBenchmarkRating(effectiveRate) {
    if (effectiveRate < 2.5) {
        return 'good';
    } else if (effectiveRate <= 3.5) {
        return 'average';
    } else {
        return 'high';
    }
}

/**
 * Calculate savings proposal
 * @param {number} currentRate - Current effective rate
 * @param {number} monthlyVolume - Monthly sales volume
 * @param {number} reductionAmount - Rate reduction in percentage points (default 0.5)
 * @returns {object} - Proposal with new rate and savings
 */
export function calculateSavingsProposal(currentRate, monthlyVolume, reductionAmount = 0.5) {
    if (!currentRate || currentRate <= 0 || !monthlyVolume || monthlyVolume <= 0) {
        return {
            currentRate: 0,
            proposedRate: 0,
            monthlySavings: 0,
            annualSavings: 0
        };
    }

    const proposedRate = Math.max(0, currentRate - reductionAmount);
    const monthlySavings = ((currentRate - proposedRate) / 100) * monthlyVolume;
    const annualSavings = monthlySavings * 12;

    return {
        currentRate: parseFloat(currentRate.toFixed(2)),
        proposedRate: parseFloat(proposedRate.toFixed(2)),
        monthlySavings: parseFloat(monthlySavings.toFixed(2)),
        annualSavings: parseFloat(annualSavings.toFixed(2))
    };
}

/**
 * Extract data from statement text (basic text extraction)
 * This is a simplified version - in production you'd use PDF parsing
 * @param {string} text - Extracted text from PDF
 * @returns {object} - Extracted data
 */
export function extractStatementData(text) {
    const data = {
        totalSales: null,
        totalFees: null,
        transactionCount: null,
        effectiveRate: null
    };

    if (!text) return data;

    const lowerText = text.toLowerCase();

    // Common patterns in merchant statements
    const patterns = {
        totalSales: [
            /total\s+(?:sales|volume|deposits)[\s:]*\$?([\d,]+\.?\d*)/i,
            /gross\s+sales[\s:]*\$?([\d,]+\.?\d*)/i,
            /card\s+sales[\s:]*\$?([\d,]+\.?\d*)/i
        ],
        totalFees: [
            /total\s+(?:fees|charges)[\s:]*\$?([\d,]+\.?\d*)/i,
            /processing\s+fees[\s:]*\$?([\d,]+\.?\d*)/i,
            /merchant\s+fees[\s:]*\$?([\d,]+\.?\d*)/i
        ],
        transactionCount: [
            /total\s+transactions?[\s:]*(\d+)/i,
            /number\s+of\s+transactions?[\s:]*(\d+)/i,
            /transaction\s+count[\s:]*(\d+)/i
        ]
    };

    // Try each pattern
    for (const [field, regexList] of Object.entries(patterns)) {
        for (const regex of regexList) {
            const match = text.match(regex);
            if (match) {
                const value = parseFloat(match[1].replace(/,/g, ''));
                if (!isNaN(value)) {
                    data[field] = value;
                }
                break;
            }
        }
    }

    // Calculate effective rate if we have both values
    if (data.totalSales && data.totalFees) {
        data.effectiveRate = calculateEffectiveRate(data.totalFees, data.totalSales);
    }

    return data;
}

/**
 * Business type options
 */
export const BUSINESS_TYPES = [
    { value: 'retail', label: 'Retail Store', icon: '🏪' },
    { value: 'restaurant', label: 'Restaurant / Cafe', icon: '🍽️' },
    { value: 'ecommerce', label: 'E-commerce / Online', icon: '🛒' },
    { value: 'service', label: 'Service Business', icon: '🔧' },
    { value: 'healthcare', label: 'Healthcare / Medical', icon: '🏥' },
    { value: 'professional', label: 'Professional Services', icon: '💼' },
    { value: 'hospitality', label: 'Hotel / Hospitality', icon: '🏨' },
    { value: 'other', label: 'Other', icon: '🏢' }
];

/**
 * Format currency
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount) {
    if (amount === null || amount === undefined) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Format percentage
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage string
 */
export function formatPercentage(value, decimals = 2) {
    if (value === null || value === undefined) return '0.00%';
    return `${value.toFixed(decimals)}%`;
}

/**
 * Generate session ID for anonymous users
 * @returns {string} - Random session ID
 */
export function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

/**
 * Get rating color and label
 * @param {string} rating - 'good', 'average', or 'high'
 * @returns {object} - Color and label
 */
/**
 * Main calculation function - runs all calculations from input data
 * @param {Object} input - User input data
 * @param {string} input.businessType - Business type
 * @param {number} input.monthlyVolume - Monthly processing volume
 * @param {number} input.monthlyFees - Monthly processing fees
 * @param {number} input.avgTicket - Average ticket size (optional)
 * @returns {Object} - Complete calculation results
 */
export function runCalculations(input) {
  const { monthlyVolume, monthlyFees, businessType, avgTicket } = input;
  
  // Validate inputs
  const vol = parseFloat(monthlyVolume) || 0;
  const fees = parseFloat(monthlyFees) || 0;
  
  // Calculate effective rate
  const effectiveRate = calculateEffectiveRate(fees, vol);
  
  // Get benchmark rating
  const benchmarkRating = getBenchmarkRating(effectiveRate);
  
  // Calculate proposal (0.5% reduction)
  const proposal = calculateSavingsProposal(effectiveRate, vol, 0.5);
  
  return {
    input: { 
      monthlyVolume: vol, 
      monthlyFees: fees, 
      avgTicket,
      businessType 
    },
    effectiveRate,
    benchmark: {
      category: benchmarkRating,
      ...getRatingDisplay(benchmarkRating)
    },
    proposedRate: proposal.proposedRate,
    savings: {
      monthly: proposal.monthlySavings,
      annual: proposal.annualSavings,
      rateDifference: proposal.proposedRate > 0 ? effectiveRate - proposal.proposedRate : 0
    },
    timestamp: new Date().toISOString()
  };
}

export function getRatingDisplay(rating) {
    switch (rating) {
        case 'good':
            return { color: 'green', bg: 'bg-green-100', text: 'text-green-700', label: 'Good Rate', barColor: 'bg-green-500' };
        case 'average':
            return { color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Average Rate', barColor: 'bg-yellow-500' };
        case 'high':
            return { color: 'red', bg: 'bg-red-100', text: 'text-red-700', label: 'High Rate', barColor: 'bg-red-500' };
        default:
            return { color: 'gray', bg: 'bg-gray-100', text: 'text-gray-600', label: 'Unknown', barColor: 'bg-gray-400' };
    }
}
