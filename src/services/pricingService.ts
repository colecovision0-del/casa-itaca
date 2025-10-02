// Pricing configuration - Update these values as needed
export interface PricingConfig {
  weekday: number;  // Monday-Thursday
  weekend: number;  // Friday-Saturday
  sunday: number;   // Sunday
  monthlyMultipliers: Record<number, number>; // 1-12 for Jan-Dec
}

// Default pricing configuration
export const DEFAULT_PRICING: PricingConfig = {
  weekday: 96,   // Base price for Mon-Thu
  weekend: 110,  // Base price for Fri-Sat
  sunday: 96,    // Base price for Sunday
  monthlyMultipliers: {
    1: 0.7,   // January - 30% discount
    2: 0.7,   // February - 30% discount
    3: 0.8,   // March - 20% discount
    4: 0.9,   // April - 10% discount
    5: 1.0,   // May - base price
    6: 1.2,   // June - 20% premium
    7: 1.5,   // July - 50% premium (peak season)
    8: 1.5,   // August - 50% premium (peak season)
    9: 1.1,   // September - 10% premium
    10: 0.85, // October - 15% discount
    11: 0.7,  // November - 30% discount
    12: 0.75, // December - 25% discount
  }
};

/**
 * Calculate the price for a specific date based on day of week and month
 */
export const calculatePrice = (date: Date, config: PricingConfig = DEFAULT_PRICING): number => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const month = date.getMonth() + 1; // 1-12
  
  // Determine base price based on day of week
  let basePrice: number;
  if (dayOfWeek === 0) {
    // Sunday
    basePrice = config.sunday;
  } else if (dayOfWeek === 5 || dayOfWeek === 6) {
    // Friday or Saturday
    basePrice = config.weekend;
  } else {
    // Monday-Thursday
    basePrice = config.weekday;
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
