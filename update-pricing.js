#!/usr/bin/env node

/**
 * Pricing Update Script
 * 
 * This script updates the pricingService.ts file with new pricing configuration
 * and commits the changes to GitHub.
 * 
 * Usage:
 *   1. Export pricing-config.json from the admin UI
 *   2. Place it in the project root directory
 *   3. Run: node update-pricing.js
 * 
 * Requirements:
 *   - Node.js installed
 *   - Git repository initialized
 *   - pricing-config.json file in the same directory
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG_FILE = 'pricing-config.json';
const SERVICE_FILE = 'src/services/pricingService.ts';

console.log('🚀 Starting pricing update process...\n');

// Step 1: Read the configuration file
console.log('📖 Reading pricing configuration...');
let config;
try {
  const configPath = path.join(__dirname, CONFIG_FILE);
  const configContent = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configContent);
  console.log('✅ Configuration loaded successfully\n');
} catch (error) {
  console.error('❌ Error reading pricing-config.json:');
  console.error('   Make sure the file exists in the project root directory');
  console.error('   Error details:', error.message);
  process.exit(1);
}

// Step 2: Validate configuration
console.log('🔍 Validating configuration...');
const requiredFields = ['weekday', 'weekend', 'sunday', 'monthlyMultipliers'];
const missingFields = requiredFields.filter(field => !(field in config));

if (missingFields.length > 0) {
  console.error('❌ Invalid configuration. Missing fields:', missingFields.join(', '));
  process.exit(1);
}

// Validate monthly multipliers
for (let month = 1; month <= 12; month++) {
  if (!(month in config.monthlyMultipliers)) {
    console.error(`❌ Missing multiplier for month ${month}`);
    process.exit(1);
  }
}
console.log('✅ Configuration is valid\n');

// Step 3: Generate the new pricingService.ts content
console.log('📝 Generating new pricingService.ts file...');
const newServiceContent = `// Pricing configuration - Update these values as needed
export interface PricingConfig {
  weekday: number;  // Monday-Thursday
  weekend: number;  // Friday-Saturday
  sunday: number;   // Sunday
  monthlyMultipliers: Record<number, number>; // 1-12 for Jan-Dec
}

// Default pricing configuration
export const DEFAULT_PRICING: PricingConfig = {
  weekday: ${config.weekday},   // Base price for Mon-Thu
  weekend: ${config.weekend},  // Base price for Fri-Sat
  sunday: ${config.sunday},    // Base price for Sunday
  monthlyMultipliers: {
    1: ${config.monthlyMultipliers[1]},   // January
    2: ${config.monthlyMultipliers[2]},   // February
    3: ${config.monthlyMultipliers[3]},   // March
    4: ${config.monthlyMultipliers[4]},   // April
    5: ${config.monthlyMultipliers[5]},   // May
    6: ${config.monthlyMultipliers[6]},   // June
    7: ${config.monthlyMultipliers[7]},   // July
    8: ${config.monthlyMultipliers[8]},   // August
    9: ${config.monthlyMultipliers[9]},   // September
    10: ${config.monthlyMultipliers[10]}, // October
    11: ${config.monthlyMultipliers[11]}, // November
    12: ${config.monthlyMultipliers[12]}, // December
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
`;

// Step 4: Write the new file
try {
  const servicePath = path.join(__dirname, SERVICE_FILE);
  fs.writeFileSync(servicePath, newServiceContent, 'utf8');
  console.log('✅ pricingService.ts updated successfully\n');
} catch (error) {
  console.error('❌ Error writing pricingService.ts:', error.message);
  process.exit(1);
}

// Step 5: Git operations
console.log('📦 Committing changes to Git...');
try {
  // Check if git is initialized
  execSync('git status', { stdio: 'ignore' });
  
  // Stage the changes
  execSync(`git add ${SERVICE_FILE}`, { stdio: 'inherit' });
  
  // Commit the changes
  const commitMessage = `Update pricing configuration - Weekday: €${config.weekday}, Weekend: €${config.weekend}, Sunday: €${config.sunday}`;
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  
  console.log('\n✅ Changes committed to Git\n');
  
  // Push to GitHub
  console.log('🚀 Pushing to GitHub...');
  execSync('git push', { stdio: 'inherit' });
  
  console.log('\n✅ Changes pushed to GitHub successfully!\n');
  console.log('🎉 Pricing update complete!');
  console.log('   Your website will update automatically with the new prices.\n');
  
} catch (error) {
  console.error('\n⚠️  Git operations failed:');
  console.error('   Make sure you have:');
  console.error('   - Git initialized in this directory');
  console.error('   - Committed previous changes');
  console.error('   - Set up GitHub remote');
  console.error('\n   You can manually commit and push the changes to', SERVICE_FILE);
  process.exit(1);
}
