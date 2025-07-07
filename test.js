// Simple test file to verify the Bengali date utilities work correctly
// Run with: node test.js

const {
  toBengaliNumerals,
  toEnglishNumerals,
  formatDateToBengali,
  bengaliDateToISO,
  getCurrentBengaliDate,
  isValidBengaliDate,
  parseFlexibleDate,
  compareBengaliDates
} = require('./src/utils/bengaliDate.js');

console.log('🧪 Testing React Bengali Date Utilities\n');

// Test 1: Number conversion
console.log('1️⃣ Number Conversion Tests:');
console.log('English to Bengali: 2025 →', toBengaliNumerals('2025'));
console.log('Bengali to English: ২০২৫ →', toEnglishNumerals('২০২৫'));
console.log('Mixed conversion: 07/07/2025 →', toBengaliNumerals('07/07/2025'));
console.log('');

// Test 2: Date formatting
console.log('2️⃣ Date Formatting Tests:');
const testDate = new Date('2025-07-07');
console.log('ISO to Bengali: 2025-07-07 →', formatDateToBengali(testDate));
console.log('Current date in Bengali:', getCurrentBengaliDate());
console.log('');

// Test 3: Date validation
console.log('3️⃣ Date Validation Tests:');
const validBengaliDate = '০৭/০৭/২০২৫';
const invalidBengaliDate = '৩২/১৩/২০২৫';
const englishDate = '07/07/2025';

console.log(`Valid Bengali date (${validBengaliDate}):`, isValidBengaliDate(validBengaliDate));
console.log(`Invalid Bengali date (${invalidBengaliDate}):`, isValidBengaliDate(invalidBengaliDate));
console.log(`English date (${englishDate}):`, isValidBengaliDate(englishDate));
console.log('');

// Test 4: Bengali to ISO conversion
console.log('4️⃣ Bengali to ISO Conversion Tests:');
console.log('Bengali to ISO: ০৭/০৭/২০২৫ →', bengaliDateToISO('০৭/০৭/২০২৫'));
console.log('Invalid Bengali to ISO: ৩২/১৩/২০২৫ →', bengaliDateToISO('৩২/১৩/২০২৫'));
console.log('');

// Test 5: Flexible date parsing
console.log('5️⃣ Flexible Date Parsing Tests:');
console.log('Parse ০৭০৭২০২৫ →', parseFlexibleDate('০৭০৭২০২৫'));
console.log('Parse ০৭-০৭-২০২৫ →', parseFlexibleDate('০৭-০৭-২০২৫'));
console.log('Parse ৭/৭/২৫ →', parseFlexibleDate('৭/৭/২৫'));
console.log('');

// Test 6: Date comparison
console.log('6️⃣ Date Comparison Tests:');
const date1 = '০৭/০৭/২০২৫';
const date2 = '০৮/০৭/২০২৫';
const date3 = '০৭/০৭/২০২৫';

console.log(`Compare ${date1} vs ${date2}:`, compareBengaliDates(date1, date2)); // Should be -1
console.log(`Compare ${date2} vs ${date1}:`, compareBengaliDates(date2, date1)); // Should be 1
console.log(`Compare ${date1} vs ${date3}:`, compareBengaliDates(date1, date3)); // Should be 0
console.log('');

// Test 7: Edge cases
console.log('7️⃣ Edge Case Tests:');
console.log('Empty string to Bengali:', toBengaliNumerals(''));
console.log('Null to Bengali:', toBengaliNumerals(null));
console.log('Undefined to Bengali:', toBengaliNumerals(undefined));
console.log('Invalid date format:', formatDateToBengali('invalid-date'));
console.log('');

console.log('✅ All tests completed! Check the results above.');
console.log('📝 Note: This is a basic test. For production use, consider adding proper unit tests with Jest.');