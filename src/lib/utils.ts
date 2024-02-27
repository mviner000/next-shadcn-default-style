import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CURRENCIES = {
  1: 'PHP',
  2: 'USD',
  3: 'EUR',
  4: 'GBP',
  5: 'BDT'
};

const LOCALES = {
  1: 'en-PH', // English - Philippines
  2: 'en-US', // English - United States
  3: 'en-GB', // English - United Kingdom
  4: 'en-GB', // English - United Kingdom (same as GBP)
  5: 'en-BD', // English - Bangladesh
};

const DEFAULT_CURRENCY = 1;
const DEFAULT_LOCALE = 1;

export function formatPrice(
  price: number | string,
  options: {
    currency?: keyof typeof CURRENCIES,
    notation?: Intl.NumberFormatOptions['notation'],
    locale?: keyof typeof LOCALES
  } = {}
) {
  const { currency = DEFAULT_CURRENCY, notation = 'compact', locale = DEFAULT_LOCALE } = options;
  const selectedCurrency = CURRENCIES[currency];
  const selectedLocale = LOCALES[locale];

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat(selectedLocale, {
    style: 'currency',
    currency: selectedCurrency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
