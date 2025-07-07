// Main export file for react-bengali-date package

// Import utilities
import BengaliDateUtils, {
  toBengaliNumerals,
  toEnglishNumerals,
  formatDateToBengali,
  bengaliDateToISO,
  getCurrentBengaliDate,
  isValidBengaliDate,
  parseFlexibleDate,
  formatBengaliDateInput,
  createBengaliDateInputHandler,
  compareBengaliDates,
  filterByBengaliDateRange,
  convertToISO,
  convertFromISO
} from './utils/bengaliDate';

// Import components
import BengaliDateInput, { 
  withBengaliDate, 
  useBengaliDate 
} from './components/BengaliDateInput';

// Export utilities
export {
  // Core utility functions
  toBengaliNumerals,
  toEnglishNumerals,
  formatDateToBengali,
  bengaliDateToISO,
  getCurrentBengaliDate,
  isValidBengaliDate,
  parseFlexibleDate,
  formatBengaliDateInput,
  createBengaliDateInputHandler,
  compareBengaliDates,
  filterByBengaliDateRange,
  convertToISO,
  convertFromISO,
  
  // Default utility object
  BengaliDateUtils,
  
  // React components and hooks
  BengaliDateInput,
  withBengaliDate,
  useBengaliDate
};

// Default export - the main component
export default BengaliDateInput;