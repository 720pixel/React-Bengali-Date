// Bengali Date Utility Functions
// Converts between English and Bengali numerals and handles date formatting

// Bengali numeral mapping
const englishToBengali = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const bengaliToEnglish = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
};

/**
 * Convert English numerals to Bengali numerals
 * @param {string|number} input - Input containing English numerals
 * @returns {string} - String with Bengali numerals
 */
export const toBengaliNumerals = (input) => {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, (digit) => englishToBengali[digit] || digit);
};

/**
 * Convert Bengali numerals to English numerals
 * @param {string} input - Input containing Bengali numerals
 * @returns {string} - String with English numerals
 */
export const toEnglishNumerals = (input) => {
  if (!input) return '';
  return String(input).replace(/[০-৯]/g, (digit) => bengaliToEnglish[digit] || digit);
};

/**
 * Format date to Bengali DD/MM/YYYY format
 * @param {string|Date} date - Date in any format
 * @returns {string} - Bengali formatted date (DD/MM/YYYY)
 */
export const formatDateToBengali = (date) => {
  if (!date) return '';
  
  let dateObj;
  if (typeof date === 'string') {
    // Handle different date formats
    if (date.includes('-')) {
      // ISO format (YYYY-MM-DD) or other dash-separated formats
      dateObj = new Date(date);
    } else if (date.includes('/')) {
      // Already in DD/MM/YYYY or MM/DD/YYYY format
      const parts = date.split('/');
      if (parts.length === 3) {
        // Assume DD/MM/YYYY format if day <= 12, otherwise MM/DD/YYYY
        const [first, second, third] = parts.map(p => parseInt(toEnglishNumerals(p)));
        if (first <= 12 && second > 12) {
          // MM/DD/YYYY format
          dateObj = new Date(third, first - 1, second);
        } else {
          // DD/MM/YYYY format
          dateObj = new Date(third, second - 1, first);
        }
      }
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = new Date(date);
  }
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getFullYear());
  
  return toBengaliNumerals(`${day}/${month}/${year}`);
};

/**
 * Convert Bengali date (DD/MM/YYYY) to ISO format (YYYY-MM-DD)
 * @param {string} bengaliDate - Date in Bengali DD/MM/YYYY format
 * @returns {string} - ISO format date (YYYY-MM-DD)
 */
export const bengaliDateToISO = (bengaliDate) => {
  if (!bengaliDate) return '';
  
  const englishDate = toEnglishNumerals(bengaliDate).replace(/\/|-/g, '');
  
  if (englishDate.length !== 8) return '';
  
  const day = englishDate.substring(0, 2);
  const month = englishDate.substring(2, 4);
  const year = englishDate.substring(4, 8);
  
  // Validate date parts
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  
  if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900) {
    return '';
  }
  
  return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

/**
 * Get current date in Bengali format
 * @returns {string} - Current date in Bengali DD/MM/YYYY format
 */
export const getCurrentBengaliDate = () => {
  return formatDateToBengali(new Date());
};

/**
 * Validate Bengali date format (DD/MM/YYYY)
 * @param {string} bengaliDate - Date string to validate
 * @returns {boolean} - True if valid Bengali date format
 */
export const isValidBengaliDate = (bengaliDate) => {
  if (!bengaliDate) return false;
  
  // Check if it matches DD/MM/YYYY pattern with Bengali numerals
  const bengaliDatePattern = /^[০-৯]{1,2}\/[০-৯]{1,2}\/[০-৯]{4}$/;
  if (!bengaliDatePattern.test(bengaliDate)) return false;
  
  const englishDate = toEnglishNumerals(bengaliDate);
  const parts = englishDate.split('/');
  
  if (parts.length !== 3) return false;
  
  const [day, month, year] = parts.map(p => parseInt(p));
  
  // Basic validation
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    return false;
  }
  
  // Create date object to check if it's a valid date
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getDate() === day && 
         dateObj.getMonth() === month - 1 && 
         dateObj.getFullYear() === year;
};

/**
 * Parse flexible date input and convert to ISO format
 * @param {string} input - Date input in various formats
 * @returns {string|null} - ISO format date (YYYY-MM-DD) or null if invalid
 */
export const parseFlexibleDate = (input) => {
  if (!input || !input.trim()) return null;
  
  const englishDate = toEnglishNumerals(input.trim());
  let day, month, year;

  // Try DD/MM/YYYY or DD-MM-YYYY
  if (englishDate.includes('/') || englishDate.includes('-')) {
    const parts = englishDate.split(/\/|-/);
    if (parts.length === 3) {
      day = parseInt(parts[0]);
      month = parseInt(parts[1]);
      year = parseInt(parts[2]);
    }
  }
  // Try DDMMYYYY (8 digits)
  else if (/^\d{8}$/.test(englishDate)) {
    day = parseInt(englishDate.substring(0, 2));
    month = parseInt(englishDate.substring(2, 4));
    year = parseInt(englishDate.substring(4, 8));
  }

  // Validate and return ISO format
  if (day && month && year) {
    // Handle 2-digit years (e.g., 23 -> 2023)
    if (year < 100) {
      year = year < 50 ? 2000 + year : 1900 + year;
    }
    
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
      const dateObj = new Date(year, month - 1, day);
      if (dateObj.getDate() === day && dateObj.getMonth() === month - 1 && dateObj.getFullYear() === year) {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
  }
  
  return null;
};

/**
 * Format Bengali date input as user types (simplified - no auto-formatting)
 * @param {string} input - Current input value
 * @param {string} previousValue - Previous input value (unused in simplified version)
 * @returns {string} - Cleaned input
 */
export const formatBengaliDateInput = (input, previousValue = '') => {
  // Just return the input as-is for maximum flexibility
  return input;
};

/**
 * Create a Bengali date input handler for React components
 * @param {function} setValue - State setter function
 * @param {function} onValidDate - Callback when valid date is entered (optional)
 * @returns {function} - Input change handler
 */
export const createBengaliDateInputHandler = (setValue, onValidDate = null) => {
  return (e) => {
    const newValue = formatBengaliDateInput(e.target.value);
    setValue(newValue);
    
    // Check if date is complete and valid
    if (newValue.length === 10 && isValidBengaliDate(newValue) && onValidDate) {
      onValidDate(bengaliDateToISO(newValue));
    }
  };
};

/**
 * Compare two Bengali dates
 * @param {string} date1 - First Bengali date
 * @param {string} date2 - Second Bengali date
 * @returns {number} - -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export const compareBengaliDates = (date1, date2) => {
  const iso1 = bengaliDateToISO(date1);
  const iso2 = bengaliDateToISO(date2);
  
  if (!iso1 || !iso2) return 0;
  
  const d1 = new Date(iso1);
  const d2 = new Date(iso2);
  
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
};

/**
 * Filter array of objects by Bengali date range
 * @param {Array} data - Array of objects with date fields
 * @param {string} dateField - Name of the date field
 * @param {string} startDate - Start date in Bengali format (optional)
 * @param {string} endDate - End date in Bengali format (optional)
 * @returns {Array} - Filtered array
 */
export const filterByBengaliDateRange = (data, dateField, startDate = '', endDate = '') => {
  if (!Array.isArray(data)) return [];
  
  return data.filter(item => {
    const itemDate = item[dateField];
    if (!itemDate) return true;
    
    const itemBengaliDate = formatDateToBengali(itemDate);
    
    if (startDate && compareBengaliDates(itemBengaliDate, startDate) < 0) {
      return false;
    }
    
    if (endDate && compareBengaliDates(itemBengaliDate, endDate) > 0) {
      return false;
    }
    
    return true;
  });
};

/**
 * Convert Bengali date to ISO format (alias for bengaliDateToISO)
 * @param {string} bengaliDate - Date in Bengali DD/MM/YYYY format
 * @returns {string} - ISO format date (YYYY-MM-DD)
 */
export const convertToISO = bengaliDateToISO;

/**
 * Convert ISO date to Bengali format (alias for formatDateToBengali)
 * @param {string} isoDate - Date in ISO YYYY-MM-DD format
 * @returns {string} - Bengali formatted date (DD/MM/YYYY)
 */
export const convertFromISO = formatDateToBengali;

// Export default object with all functions
const BengaliDateUtils = {
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
};

export default BengaliDateUtils;