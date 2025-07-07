# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-07

### Added
- Initial release of react-bengali-date
- Bengali numeral conversion utilities (`toBengaliNumerals`, `toEnglishNumerals`)
- Comprehensive date formatting functions (`formatDateToBengali`, `bengaliDateToISO`)
- Date validation with `isValidBengaliDate`
- Flexible date parsing with `parseFlexibleDate`
- Date comparison utilities (`compareBengaliDates`)
- Array filtering by date range (`filterByBengaliDateRange`)
- React component `BengaliDateInput` with multiple variants and themes
- Custom React hook `useBengaliDate` for state management
- Higher-order component `withBengaliDate` for enhanced functionality
- Comprehensive CSS styling with theme support (light/dark)
- Size variants (small, medium, large)
- State variants (default, error, success)
- Validation icon support
- Auto-conversion from English to Bengali numerals
- Complete documentation in English and Bengali
- Example usage file
- MIT License

### Features
- **Bengali Numeral Support**: Full conversion between English (0-9) and Bengali (০-৯) numerals
- **Flexible Input Formats**: Support for DD/MM/YYYY, DD-MM-YYYY, and DDMMYYYY formats
- **Date Validation**: Comprehensive validation for both format and actual date validity
- **React Integration**: Ready-to-use React component with hooks and HOC
- **Customizable Styling**: Multiple themes, sizes, and state variants
- **Cultural Adaptation**: Designed specifically for Bengali/Bangladeshi date preferences
- **No External Dependencies**: Only requires React as peer dependency
- **TypeScript Ready**: Prepared for TypeScript definitions (coming in future release)

### Documentation
- Comprehensive README with both English and Bengali documentation
- API reference with detailed examples
- Advanced usage examples including form integration
- Styling guide and customization options
- Browser compatibility information

### Technical Details
- ES6+ JavaScript with modern React patterns
- CSS-in-JS ready with external CSS file
- Modular architecture for tree-shaking support
- Comprehensive error handling
- Performance optimized with minimal re-renders

## [Unreleased]

### Planned
- TypeScript definitions
- Additional date formats support
- Calendar picker component
- Date range picker component
- Internationalization (i18n) support
- Unit tests with Jest and React Testing Library
- Storybook documentation
- Performance optimizations
- Accessibility improvements (ARIA support)
- Mobile-responsive enhancements