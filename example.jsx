import React, { useState } from 'react';
import BengaliDateInput, { 
  useBengaliDate, 
  toBengaliNumerals, 
  formatDateToBengali,
  isValidBengaliDate,
  compareBengaliDates 
} from 'react-bengali-date';

// Basic Usage Example
function BasicExample() {
  const [date, setDate] = useState('');

  return (
    <div>
      <h3>Basic Bengali Date Input</h3>
      <BengaliDateInput
        value={date}
        onChange={setDate}
        placeholder="দিন/মাস/বছর"
      />
      <p>Selected Date: {date}</p>
    </div>
  );
}

// Advanced Usage with Hook
function AdvancedExample() {
  const { 
    bengaliDate, 
    isoDate, 
    isValid, 
    updateBengaliDate,
    reset 
  } = useBengaliDate();

  return (
    <div>
      <h3>Advanced Usage with Hook</h3>
      <BengaliDateInput
        value={bengaliDate}
        onChange={updateBengaliDate}
        showValidationIcon={true}
        size="large"
        variant={isValid && bengaliDate ? 'success' : 'default'}
      />
      <div>
        <p>Bengali Date: {bengaliDate}</p>
        <p>ISO Date: {isoDate}</p>
        <p>Valid: {isValid ? 'Yes' : 'No'}</p>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

// Form Integration Example
function FormExample() {
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

    // Check if birth date is before join date
    if (formData.birthDate && formData.joinDate && 
        compareBengaliDates(formData.birthDate, formData.joinDate) >= 0) {
      newErrors.joinDate = 'যোগদানের তারিখ জন্ম তারিখের পরে হতে হবে';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    alert('ফর্ম সফলভাবে জমা হয়েছে!');
  };

  return (
    <div>
      <h3>Form Integration Example</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>নাম:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>জন্ম তারিখ:</label>
          <BengaliDateInput
            value={formData.birthDate}
            onChange={handleDateChange('birthDate')}
            variant={errors.birthDate ? 'error' : 'default'}
            placeholder="দিন/মাস/বছর"
            required
          />
          {errors.birthDate && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.birthDate}</span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>যোগদানের তারিখ:</label>
          <BengaliDateInput
            value={formData.joinDate}
            onChange={handleDateChange('joinDate')}
            variant={errors.joinDate ? 'error' : 'default'}
            placeholder="দিন/মাস/বছর"
            required
          />
          {errors.joinDate && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.joinDate}</span>
          )}
        </div>

        <button 
          type="submit"
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          জমা দিন
        </button>
      </form>
    </div>
  );
}

// Utility Functions Demo
function UtilityDemo() {
  const [input, setInput] = useState('2025-07-07');
  const [bengaliInput, setBengaliInput] = useState('০৭/০৭/২০২৫');

  return (
    <div>
      <h3>Utility Functions Demo</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Number Conversion:</h4>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter English date/number"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <span>Bengali: {toBengaliNumerals(input)}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Date Formatting:</h4>
        <p>Today in Bengali: {formatDateToBengali(new Date())}</p>
        <p>Input date in Bengali: {formatDateToBengali(input)}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Date Validation:</h4>
        <input 
          value={bengaliInput}
          onChange={(e) => setBengaliInput(e.target.value)}
          placeholder="Enter Bengali date"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <span>Valid: {isValidBengaliDate(bengaliInput) ? 'Yes ✓' : 'No ✗'}</span>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Bengali Date - Examples</h1>
      <p>বাংলা তারিখ React কম্পোনেন্ট এবং ইউটিলিটি লাইব্রেরির উদাহরণ</p>
      
      <div style={{ marginBottom: '40px' }}>
        <BasicExample />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <AdvancedExample />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <FormExample />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <UtilityDemo />
      </div>
    </div>
  );
}

export default App;