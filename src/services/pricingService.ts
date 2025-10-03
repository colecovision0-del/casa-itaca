// Pricing configuration - Update these values as needed
export interface PricingConfig {
  low_occupation: number;  // Mon, Tue, Wed, Thu
  sunday_rate: number;     // Sunday
  high_occupation: number; // Fri, Sat
  monthlyMultipliers: Record<number, number>; // 1-12 for Jan-Dec
}

// Default pricing configuration
export const DEFAULT_PRICING: PricingConfig = {
  low_occupation: 96,
  sunday_rate: 96,
  high_occupation: 110,
  monthlyMultipliers: {
    1: 0.7,   // January
    2: 0.7,   // February
    3: 0.8,   // March
    4: 0.9,   // April
    5: 1,   // May
    6: 1.2,   // June
    7: 1.5,   // July
    8: 1.6,   // August
    9: 1.1,   // September
    10: 0.85, // October
    11: 0.7, // November
    12: 0.75, // December
  }
};

/**
 * Calculate the price for a specific date based on day of week and month
 */
export const calculatePrice = (date: Date, config: PricingConfig = DEFAULT_PRICING): number => {
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat in the viewer's locale
  const month = date.getMonth() + 1; // 1-12
  
  // Determine base price based on day of week
  let basePrice: number;
  if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday or Saturday
    basePrice = config.high_occupation;
  } else if (dayOfWeek === 0) { // Sunday
    basePrice = config.sunday_rate ?? config.low_occupation;
  } else { // Monday, Tuesday, Wednesday, Thursday
    basePrice = config.low_occupation;
  }
  
  // Apply monthly multiplier
  const multiplier = config.monthlyMultipliers[month] || 1.0;
  const finalPrice = Math.round(basePrice * multiplier);
  
  return finalPrice;
};

/**
 * Get pricing for a date range
 */
export const calculatePriceRange = (
  startDate: Date, 
  endDate: Date, 
  config: PricingConfig = DEFAULT_PRICING
): { totalPrice: number; pricePerNight: number[] } => {
  const prices: number[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate < endDate) {
    prices.push(calculatePrice(currentDate, config));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const totalPrice = prices.reduce((sum, price) => sum + price, 0);
  
  return {
    totalPrice,
    pricePerNight: prices
  };
};
