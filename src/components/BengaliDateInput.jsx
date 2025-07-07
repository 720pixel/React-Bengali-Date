import React, { useState, useEffect } from 'react';
import { 
  toBengaliNumerals, 
  toEnglishNumerals, 
  isValidBengaliDate, 
  bengaliDateToISO,
  formatDateToBengali 
} from '../utils/bengaliDate';
import './BengaliDateInput.css';

const BengaliDateInput = ({
  value = '',
  onChange,
  onValidDate,
  placeholder = 'দিন/মাস/বছর',
  required = false,
  disabled = false,
  name = '',
  id = '',
  className = '',
  autoFocus = false,
  style = {},
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'default', // 'default', 'error', 'success'
  theme = 'light', // 'light', 'dark'
  allowEnglishInput = true,
  autoConvertToBengali = true,
  showValidationIcon = false,
  onBlur,
  onFocus
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isValid, setIsValid] = useState(false);

  // Update internal value when prop changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Validate date whenever internal value changes
  useEffect(() => {
    const valid = isValidBengaliDate(internalValue);
    setIsValid(valid);
    
    if (valid && onValidDate) {
      const isoDate = bengaliDateToISO(internalValue);
      onValidDate(isoDate);
    }
  }, [internalValue, onValidDate]);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    
    // Convert English numerals to Bengali if enabled
    if (autoConvertToBengali && allowEnglishInput) {
      newValue = toBengaliNumerals(newValue);
    }
    
    setInternalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleFocus = (e) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  // Determine container classes
  const containerClasses = [
    'bengali-date-input-container',
    size,
    theme,
    variant,
    className
  ].filter(Boolean).join(' ');

  // Add validation state to variant
  let finalVariant = variant;
  if (showValidationIcon && internalValue) {
    finalVariant = isValid ? 'success' : 'error';
  }

  const finalContainerClasses = [
    'bengali-date-input-container',
    size,
    theme,
    finalVariant,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={finalContainerClasses} style={style}>
      <input
        type="text"
        id={id}
        name={name}
        value={internalValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        className="bengali-date-input"
        autoComplete="off"
        maxLength={10} // DD/MM/YYYY format
      />
      {showValidationIcon && internalValue && (
        <span className={`validation-icon ${isValid ? 'valid' : 'invalid'}`}>
          {isValid ? '✓' : '✗'}
        </span>
      )}
    </div>
  );
};

// Higher-order component for easier integration
export const withBengaliDate = (WrappedComponent) => {
  return React.forwardRef((props, ref) => {
    const [bengaliDate, setBengaliDate] = useState('');
    const [isoDate, setIsoDate] = useState('');

    const handleBengaliDateChange = (value) => {
      setBengaliDate(value);
      if (isValidBengaliDate(value)) {
        const iso = bengaliDateToISO(value);
        setIsoDate(iso);
      } else {
        setIsoDate('');
      }
    };

    return (
      <WrappedComponent
        {...props}
        ref={ref}
        bengaliDate={bengaliDate}
        isoDate={isoDate}
        onBengaliDateChange={handleBengaliDateChange}
        setBengaliDate={setBengaliDate}
        setIsoDate={setIsoDate}
      />
    );
  });
};

// Utility hook for Bengali date management
export const useBengaliDate = (initialValue = '') => {
  const [bengaliDate, setBengaliDate] = useState(
    initialValue ? formatDateToBengali(initialValue) : ''
  );
  const [isoDate, setIsoDate] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const updateBengaliDate = (value) => {
    setBengaliDate(value);
    const valid = isValidBengaliDate(value);
    setIsValid(valid);
    
    if (valid) {
      const iso = bengaliDateToISO(value);
      setIsoDate(iso);
    } else {
      setIsoDate('');
    }
  };

  const updateFromISO = (isoValue) => {
    setIsoDate(isoValue);
    const bengali = formatDateToBengali(isoValue);
    setBengaliDate(bengali);
    setIsValid(!!bengali);
  };

  const reset = () => {
    setBengaliDate('');
    setIsoDate('');
    setIsValid(false);
  };

  return {
    bengaliDate,
    isoDate,
    isValid,
    updateBengaliDate,
    updateFromISO,
    reset,
    setBengaliDate,
    setIsoDate
  };
};

export default BengaliDateInput;