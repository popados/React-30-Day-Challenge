import { fmt } from '@/features/calculator/format'

// [id, name, size of one unit in the category's base unit]
export const CATEGORIES = {
  length: {
    name: 'Length',
    units: [
      ['mm', 'Millimeters', 0.001],
      ['cm', 'Centimeters', 0.01],
      ['m', 'Meters', 1],
      ['km', 'Kilometers', 1000],
      ['in', 'Inches', 0.0254],
      ['ft', 'Feet', 0.3048],
      ['yd', 'Yards', 0.9144],
      ['mi', 'Miles', 1609.344],
      ['nmi', 'Nautical miles', 1852],
    ],
  },
  mass: {
    name: 'Mass',
    units: [
      ['mg', 'Milligrams', 1e-6],
      ['g', 'Grams', 0.001],
      ['kg', 'Kilograms', 1],
      ['t', 'Metric tons', 1000],
      ['oz', 'Ounces', 0.028349523125],
      ['lb', 'Pounds', 0.45359237],
      ['st', 'Stone', 6.35029318],
    ],
  },
  volume: {
    name: 'Volume',
    units: [
      ['mL', 'Milliliters', 0.001],
      ['L', 'Liters', 1],
      ['m³', 'Cubic meters', 1000],
      ['tsp', 'Teaspoons (US)', 0.00492892159375],
      ['tbsp', 'Tablespoons (US)', 0.01478676478125],
      ['fl oz', 'Fluid ounces (US)', 0.0295735295625],
      ['cup', 'Cups (US)', 0.2365882365],
      ['pt', 'Pints (US)', 0.473176473],
      ['qt', 'Quarts (US)', 0.946352946],
      ['gal', 'Gallons (US)', 3.785411784],
      ['imp gal', 'Gallons (UK)', 4.54609],
    ],
  },
  temperature: {
    name: 'Temperature',
    temp: true,
    units: [
      ['°C', 'Celsius'],
      ['°F', 'Fahrenheit'],
      ['K', 'Kelvin'],
    ],
  },
  area: {
    name: 'Area',
    units: [
      ['cm²', 'Square centimeters', 1e-4],
      ['m²', 'Square meters', 1],
      ['ha', 'Hectares', 1e4],
      ['km²', 'Square kilometers', 1e6],
      ['in²', 'Square inches', 0.00064516],
      ['ft²', 'Square feet', 0.09290304],
      ['yd²', 'Square yards', 0.83612736],
      ['ac', 'Acres', 4046.8564224],
      ['mi²', 'Square miles', 2589988.110336],
    ],
  },
  speed: {
    name: 'Speed',
    units: [
      ['m/s', 'Meters per second', 1],
      ['km/h', 'Kilometers per hour', 1 / 3.6],
      ['mph', 'Miles per hour', 0.44704],
      ['kn', 'Knots', 1852 / 3600],
      ['ft/s', 'Feet per second', 0.3048],
    ],
  },
  time: {
    name: 'Time',
    units: [
      ['ms', 'Milliseconds', 0.001],
      ['s', 'Seconds', 1],
      ['min', 'Minutes', 60],
      ['h', 'Hours', 3600],
      ['d', 'Days', 86400],
      ['wk', 'Weeks', 604800],
      ['yr', 'Years (365.25 d)', 31557600],
    ],
  },
  data: {
    name: 'Data',
    units: [
      ['bit', 'Bits', 0.125],
      ['B', 'Bytes', 1],
      ['KB', 'Kilobytes (1000)', 1e3],
      ['MB', 'Megabytes (1000²)', 1e6],
      ['GB', 'Gigabytes (1000³)', 1e9],
      ['TB', 'Terabytes (1000⁴)', 1e12],
      ['KiB', 'Kibibytes (1024)', 1024],
      ['MiB', 'Mebibytes (1024²)', 1048576],
      ['GiB', 'Gibibytes (1024³)', 1073741824],
      ['TiB', 'Tebibytes (1024⁴)', 1099511627776],
    ],
  },
  pressure: {
    name: 'Pressure',
    units: [
      ['Pa', 'Pascals', 1],
      ['kPa', 'Kilopascals', 1000],
      ['bar', 'Bar', 1e5],
      ['atm', 'Atmospheres', 101325],
      ['psi', 'Pounds per sq inch', 6894.757293168],
      ['mmHg', 'Millimeters of mercury', 133.322387415],
    ],
  },
  energy: {
    name: 'Energy',
    units: [
      ['J', 'Joules', 1],
      ['kJ', 'Kilojoules', 1000],
      ['cal', 'Calories', 4.184],
      ['kcal', 'Kilocalories', 4184],
      ['Wh', 'Watt-hours', 3600],
      ['kWh', 'Kilowatt-hours', 3.6e6],
      ['BTU', 'BTU', 1055.05585262],
    ],
  },
  // Fixed sample rates per 1 USD: not live market data.
  currency: {
    name: 'Currency',
    currency: true,
    units: [
      ['USD', 'US dollar', 1],
      ['EUR', 'Euro', 0.92],
      ['GBP', 'British pound', 0.79],
      ['JPY', 'Japanese yen', 150],
      ['CAD', 'Canadian dollar', 1.37],
      ['AUD', 'Australian dollar', 1.52],
      ['CHF', 'Swiss franc', 0.88],
      ['CNY', 'Chinese yuan', 7.2],
      ['INR', 'Indian rupee', 83.5],
      ['MXN', 'Mexican peso', 18],
    ],
  },
}

/** Currency decimal places, where they differ from 2. */
const MINOR_UNITS = { JPY: 0 }

export const DEFAULT_PAIRS = {
  length: ['km', 'mi'],
  mass: ['kg', 'lb'],
  volume: ['L', 'gal'],
  temperature: ['°C', '°F'],
  area: ['m²', 'ft²'],
  speed: ['km/h', 'mph'],
  time: ['h', 'min'],
  data: ['GB', 'GiB'],
  pressure: ['bar', 'psi'],
  energy: ['kWh', 'kJ'],
  currency: ['USD', 'EUR'],
}

export const findUnit = (cat, id) => CATEGORIES[cat].units.find((u) => u[0] === id)

function toBase(cat, id, x) {
  if (CATEGORIES[cat].temp) return id === '°C' ? x : id === '°F' ? ((x - 32) * 5) / 9 : x - 273.15
  return x * findUnit(cat, id)[2]
}

function fromBase(cat, id, x) {
  if (CATEGORIES[cat].temp) return id === '°C' ? x : id === '°F' ? (x * 9) / 5 + 32 : x + 273.15
  return x / findUnit(cat, id)[2]
}

/** The sample rate from one currency to another, to 6 significant digits. */
export function sampleRate(from, to) {
  const r = findUnit('currency', to)[2] / findUnit('currency', from)[2]
  return String(parseFloat(r.toPrecision(6)))
}

/**
 * Converts x between two units. For currency, `rate` (1 `pair.from` = rate
 * `pair.to`) is used between the chosen pair; other targets use sample rates.
 */
export function convertValue(cat, x, from, to, { rate, pair } = {}) {
  if (CATEGORIES[cat].currency) {
    if (from === pair.from && to === pair.to) return x * rate
    if (from === pair.to && to === pair.from) return x / rate
    return (x * findUnit('currency', to)[2]) / findUnit('currency', from)[2]
  }
  return fromBase(cat, to, toBase(cat, from, x))
}

/** Currency to its minor units; everything else to `sig` significant digits. */
export function formatUnit(cat, x, id, sig) {
  if (CATEGORIES[cat].currency) {
    const m = MINOR_UNITS[id] ?? 2
    return ((Math.sign(x) * Math.round(Math.abs(x) * 10 ** m + 1e-7)) / 10 ** m).toFixed(m)
  }
  return fmt(x, sig)
}
