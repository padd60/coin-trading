import { CoinCurrency } from 'src/entity/coin-list/model';

export const cutSecondDecimal = (value: number) => Math.round(value * 100) / 100;

export const convertPercentage = (value?: number) => (value ? `${Math.round(value * 100) / 100}%` : '');

export const convertLocalePrice = (value: number, currency: CoinCurrency) => {
  const cutSecondDecimalValue = cutSecondDecimal(Math.round(value * 100) / 100);

  return currency === 'krw'
    ? `₩${cutSecondDecimalValue.toLocaleString()}`
    : `$${cutSecondDecimalValue.toLocaleString()}`;
};

export const convertLocaleVolume = (value: number, currency: CoinCurrency) => {
  const cutSecondDecimalValue = cutSecondDecimal(Math.round(value * 100) / 100);

  const absoluteValue = Math.abs(cutSecondDecimalValue);

  return currency === 'krw' ? `₩${absoluteValue.toLocaleString()}` : `$${absoluteValue.toLocaleString()}`;
};

export const percentageStyle = (value?: number) => {
  const defaultStyle = 'w-fit text-end';

  if (!value) return defaultStyle;

  const percentage = cutSecondDecimal(Math.round(value * 100) / 100);

  if (percentage < 0) return `${defaultStyle} text-blue-500`;

  if (percentage > 0) return `${defaultStyle} text-red-500`;

  return defaultStyle;
};
