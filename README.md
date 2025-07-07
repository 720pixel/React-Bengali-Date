# React Bengali Date 🗓️

A comprehensive React component and utility library for Bengali date handling with numeral conversion and flexible date formatting.

**বাংলা তারিখ পরিচালনার জন্য একটি সম্পূর্ণ React কম্পোনেন্ট এবং ইউটিলিটি লাইব্রেরি।**

[![npm version](https://badge.fury.io/js/react-bengali-date.svg)](https://badge.fury.io/js/react-bengali-date)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features | বৈশিষ্ট্য

- ✅ **Bengali Numeral Conversion** - Convert between English (0-9) and Bengali (০-৯) numerals
- ✅ **Flexible Date Input** - Support for multiple date formats (DD/MM/YYYY, DD-MM-YYYY, DDMMYYYY)
- ✅ **Date Validation** - Comprehensive validation for Bengali date formats
- ✅ **React Component** - Ready-to-use Bengali date input component
- ✅ **React Hooks** - Custom hooks for Bengali date management
- ✅ **TypeScript Ready** - Full TypeScript support (coming soon)
- ✅ **Lightweight** - No external dependencies except React
- ✅ **Customizable** - Multiple themes, sizes, and styling options

**বাংলা:**
- ✅ **বাংলা সংখ্যা রূপান্তর** - ইংরেজি (০-৯) এবং বাংলা (০-৯) সংখ্যার মধ্যে রূপান্তর
- ✅ **নমনীয় তারিখ ইনপুট** - একাধিক তারিখ ফরম্যাট সমর্থন
- ✅ **তারিখ যাচাইকরণ** - বাংলা তারিখ ফরম্যাটের জন্য সম্পূর্ণ যাচাইকরণ
- ✅ **React কম্পোনেন্ট** - ব্যবহারের জন্য প্রস্তুত বাংলা তারিখ ইনপুট কম্পোনেন্ট

## Installation | ইনস্টলেশন

```bash
npm install react-bengali-date
```

```bash
yarn add react-bengali-date
```

## Quick Start | দ্রুত শুরু

### Basic Usage

```jsx
import React, { useState } from 'react';
import BengaliDateInput from 'react-bengali-date';

function App() {
  const [date, setDate] = useState('');

  return (
    <div>
      <BengaliDateInput
        value={date}
        onChange={setDate}
        placeholder="দিন/মাস/বছর"
      />
      <p>Selected Date: {date}</p>
    </div>
  );
}
```

### Using Utility Functions

```jsx
import { 
  toBengaliNumerals, 
  formatDateToBengali, 
  isValidBengaliDate 
} from 'react-bengali-date';

// Convert English numerals to Bengali
const bengaliNumber = toBengaliNumerals('2024'); // '২০২৪'

// Format current date to Bengali
const today = formatDateToBengali(new Date()); // '০৭/০৭/২০২৫'

// Validate Bengali date
const isValid = isValidBengaliDate('০৭/০৭/২০২৫'); // true
```

### Using the Custom Hook

```jsx
import React from 'react';
import { useBengaliDate, BengaliDateInput } from 'react-bengali-date';

function DateForm() {
  const { 
    bengaliDate, 
    isoDate, 
    isValid, 
    updateBengaliDate 
  } = useBengaliDate();

  return (
    <div>
      <BengaliDateInput
        value={bengaliDate}
        onChange={updateBengaliDate}
      />
      <p>Bengali Date: {bengaliDate}</p>
      <p>ISO Date: {isoDate}</p>
      <p>Valid: {isValid ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## API Reference | API রেফারেন্স

### BengaliDateInput Component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Current date value in Bengali format |
| `onChange` | `function` | - | Callback when date changes |
| `onValidDate` | `function` | - | Callback when a valid date is entered (receives ISO date) |
| `placeholder` | `string` | `'দিন/মাস/বছর'` | Input placeholder text |
| `required` | `boolean` | `false` | Whether the input is required |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `size` | `string` | `'medium'` | Size variant: `'small'`, `'medium'`, `'large'` |
| `variant` | `string` | `'default'` | Style variant: `'default'`, `'error'`, `'success'` |
| `theme` | `string` | `'light'` | Theme: `'light'`, `'dark'` |
| `autoConvertToBengali` | `boolean` | `true` | Auto-convert English numerals to Bengali |
| `showValidationIcon` | `boolean` | `false` | Show validation icon |

#### Example with All Props

```jsx
<BengaliDateInput
  value={date}
  onChange={setDate}
  onValidDate={(isoDate) => console.log('Valid date:', isoDate)}
  placeholder="তারিখ লিখুন"
  required
  size="large"
  variant="success"
  theme="dark"
  autoConvertToBengali={true}
  showValidationIcon={true}
  className="my-custom-class"
/>
```

### Utility Functions

#### `toBengaliNumerals(input)`
Convert English numerals to Bengali numerals.

```jsx
toBengaliNumerals('123') // '১২৩'
toBengaliNumerals('2024-07-07') // '২০২৪-০৭-০৭'
```

#### `toEnglishNumerals(input)`
Convert Bengali numerals to English numerals.

```jsx
toEnglishNumerals('১২৩') // '123'
toEnglishNumerals('০৭/০৭/২০২৫') // '07/07/2025'
```

#### `formatDateToBengali(date)`
Format any date to Bengali DD/MM/YYYY format.

```jsx
formatDateToBengali(new Date()) // '০৭/০৭/২০২৫'
formatDateToBengali('2025-07-07') // '০৭/০৭/২০২৫'
formatDateToBengali('07/07/2025') // '০৭/০৭/২০২৫'
```

#### `bengaliDateToISO(bengaliDate)`
Convert Bengali date to ISO format (YYYY-MM-DD).

```jsx
bengaliDateToISO('০৭/০৭/২০২৫') // '2025-07-07'
```

#### `isValidBengaliDate(bengaliDate)`
Validate Bengali date format and actual date validity.

```jsx
isValidBengaliDate('০৭/০৭/২০২৫') // true
isValidBengaliDate('৩২/১৩/২০২৫') // false (invalid date)
isValidBengaliDate('07/07/2025') // false (not Bengali numerals)
```

#### `getCurrentBengaliDate()`
Get current date in Bengali format.

```jsx
getCurrentBengaliDate() // '০৭/০৭/২০২৫'
```

#### `parseFlexibleDate(input)`
Parse various date formats and return ISO date.

```jsx
parseFlexibleDate('০৭০৭২০২৫') // '2025-07-07'
parseFlexibleDate('০৭-০৭-২০২৫') // '2025-07-07'
parseFlexibleDate('৭/৭/২৫') // '2025-07-07'
```

#### `compareBengaliDates(date1, date2)`
Compare two Bengali dates.

```jsx
compareBengaliDates('০৭/০৭/২০২৫', '০৮/০৭/২০২৫') // -1 (date1 < date2)
compareBengaliDates('০৭/০৭/২০২৫', '০৭/০৭/২০২৫') // 0 (equal)
compareBengaliDates('০৮/০৭/২০২৫', '০৭/০৭/২০২৫') // 1 (date1 > date2)
```

#### `filterByBengaliDateRange(data, dateField, startDate, endDate)`
Filter array of objects by Bengali date range.

```jsx
const data = [
  { name: 'Item 1', date: '২০২৫-০৭-০৫' },
  { name: 'Item 2', date: '২০২৫-০৭-১০' },
  { name: 'Item 3', date: '২০২৫-০৭-১৫' }
];

filterByBengaliDateRange(
  data, 
  'date', 
  '০৫/০৭/২০২৫', // start date
  '১০/০৭/২০২৫'  // end date
); // Returns items 1 and 2
```

### Custom Hooks

#### `useBengaliDate(initialValue)`
Custom hook for Bengali date management.

```jsx
const {
  bengaliDate,    // Current Bengali date string
  isoDate,        // Current ISO date string
  isValid,        // Boolean indicating if current date is valid
  updateBengaliDate, // Function to update Bengali date
  updateFromISO,  // Function to update from ISO date
  reset,          // Function to reset all values
  setBengaliDate, // Direct setter for Bengali date
  setIsoDate      // Direct setter for ISO date
} = useBengaliDate('2025-07-07');
```

#### `withBengaliDate(Component)`
Higher-order component for Bengali date functionality.

```jsx
const EnhancedComponent = withBengaliDate(MyComponent);

// MyComponent will receive these additional props:
// - bengaliDate
// - isoDate
// - onBengaliDateChange
// - setBengaliDate
// - setIsoDate
```

## Styling | স্টাইলিং

### CSS Classes

The component uses these CSS classes that you can customize:

```css
.bengali-date-input-container { /* Container */ }
.bengali-date-input { /* Input field */ }
.bengali-date-input:focus { /* Focused state */ }
.bengali-date-input:disabled { /* Disabled state */ }

/* Size variants */
.bengali-date-input-container.small { }
.bengali-date-input-container.large { }

/* Theme variants */
.bengali-date-input-container.dark { }

/* State variants */
.bengali-date-input-container.error { }
.bengali-date-input-container.success { }
```

### Custom Styling

```jsx
<BengaliDateInput
  value={date}
  onChange={setDate}
  style={{ 
    width: '300px',
    margin: '10px 0'
  }}
  className="my-custom-date-input"
/>
```

## Advanced Examples | উন্নত উদাহরণ

### Form Integration

```jsx
import React, { useState } from 'react';
import { BengaliDateInput, isValidBengaliDate, bengaliDateToISO } from 'react-bengali-date';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    joinDate: ''
  });
  const [errors, setErrors] = useState({});

  const handleDateChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate dates
    if (!isValidBengaliDate(formData.birthDate)) {
      newErrors.birthDate = 'অবৈধ জন্ম তারিখ';
    }
    if (!isValidBengaliDate(formData.joinDate)) {
      newErrors.joinDate = 'অবৈধ যোগদানের তারিখ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert to ISO for API
    const submitData = {
      ...formData,
      birthDate: bengaliDateToISO(formData.birthDate),
      joinDate: bengaliDateToISO(formData.joinDate)
    };

    console.log('Submitting:', submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>নাম:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <label>জন্ম তারিখ:</label>
        <BengaliDateInput
          value={formData.birthDate}
          onChange={handleDateChange('birthDate')}
          variant={errors.birthDate ? 'error' : 'default'}
          placeholder="দিন/মাস/বছর"
        />
        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
      </div>

      <div>
        <label>যোগদানের তারিখ:</label>
        <BengaliDateInput
          value={formData.joinDate}
          onChange={handleDateChange('joinDate')}
          variant={errors.joinDate ? 'error' : 'default'}
          placeholder="দিন/মাস/বছর"
        />
        {errors.joinDate && <span className="error">{errors.joinDate}</span>}
      </div>

      <button type="submit">জমা দিন</button>
    </form>
  );
}
```

### Date Range Picker

```jsx
import React, { useState } from 'react';
import { BengaliDateInput, compareBengaliDates } from 'react-bengali-date';

function DateRangePicker({ onRangeChange }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleStartDateChange = (value) => {
    setStartDate(value);
    validateRange(value, endDate);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
    validateRange(startDate, value);
  };

  const validateRange = (start, end) => {
    if (start && end && compareBengaliDates(start, end) > 0) {
      setError('শুরুর তারিখ শেষের তারিখের চেয়ে বড় হতে পারে না');
    } else {
      setError('');
      if (onRangeChange) {
        onRangeChange({ startDate: start, endDate: end });
      }
    }
  };

  return (
    <div className="date-range-picker">
      <div>
        <label>শুরুর তারিখ:</label>
        <BengaliDateInput
          value={startDate}
          onChange={handleStartDateChange}
          placeholder="দিন/মাস/বছর"
        />
      </div>
      
      <div>
        <label>শেষের তারিখ:</label>
        <BengaliDateInput
          value={endDate}
          onChange={handleEndDateChange}
          placeholder="দিন/মাস/বছর"
        />
      </div>
      
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

## Browser Support | ব্রাউজার সাপোর্ট

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing | অবদান

Contributions are welcome! Please feel free to submit a Pull Request.

**অবদান স্বাগত! অনুগ্রহ করে একটি Pull Request জমা দিতে দ্বিধা করবেন না।**

## License | লাইসেন্স

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog | পরিবর্তনের তালিকা

### v1.0.0
- Initial release
- Bengali numeral conversion
- Date validation and formatting
- React component with multiple variants
- Custom hooks for date management
- TypeScript definitions (coming soon)

## Support | সাহায্য

If you find this package helpful, please consider giving it a star ⭐ on GitHub!

**যদি এই প্যাকেজটি সহায়ক মনে হয়, অনুগ্রহ করে GitHub এ একটি তারকা ⭐ দিন!**

For issues and feature requests, please use the [GitHub Issues](https://github.com/yourusername/react-bengali-date/issues) page.

---

Made with ❤️ for the Bengali community | বাংলা কমিউনিটির জন্য ❤️ দিয়ে তৈরি