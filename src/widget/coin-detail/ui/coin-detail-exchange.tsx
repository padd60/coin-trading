import { useState, useEffect } from 'react';
import { CoinDetailResponse } from 'src/entity/coin-detail/model';
import { useListSettingStore } from 'src/shared/store/list-setting';
import { cutSecondDecimal } from 'src/widget/coin-list/lib/utils';
import { useShallow } from 'zustand/react/shallow';
import ExchangeImage from 'src/shared/assets/exchange.png';
import ExchangeInput from 'src/feature/coin-detail/ui/exchange-input';

type CoinDetailExchangeProps = Pick<CoinDetailResponse, 'symbol' | 'market_data'>;

const CoinDetailExchange = ({ symbol, market_data }: CoinDetailExchangeProps) => {
  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));

  const [coinValue, setCoinValue] = useState('');

  const exchangeCoinToCurrency = (value: string) => {
    const exchangeValue = cutSecondDecimal(Number(value) * market_data.current_price[vs_currency]);
    setCurrencyValue(exchangeValue !== 0 ? String(exchangeValue) : '');
  };

  const handleCoinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const regex = /^[0-9]*\.?[0-9]*$/;

    const isDecimal = value.includes('.');

    const isDecimalNumberOverCondition = value.split('.')[1] ? value.split('.')[1].length > 8 : false;

    const decimalRestrictCondition = isDecimal && isDecimalNumberOverCondition;

    if (!regex.test(value) || decimalRestrictCondition) {
      setCoinValue((current) => current);
      return;
    }
    exchangeCoinToCurrency(value);
    setCoinValue(value);
  };

  const [currencyValue, setCurrencyValue] = useState('');

  const exchangeCurrentToCoin = (value: string) => {
    const exchangeValue = cutSecondDecimal(Number(value) / market_data.current_price[vs_currency]);
    setCoinValue(String(exchangeValue));
  };

  const handleCurrencyValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length === 1 && value === '0') {
      setCurrencyValue('');
      return;
    }

    const regex = /^[0-9]*$/;

    const isDecimal = value.includes('.');

    const isDecimalNumberOverCondition = value.split('.')[1] ? value.split('.')[1].length > 8 : false;

    const decimalRestrictCondition = isDecimal && isDecimalNumberOverCondition;

    if (!regex.test(value) || decimalRestrictCondition) {
      setCurrencyValue((current) => current);
      return;
    }
    exchangeCurrentToCoin(value);
    setCurrencyValue(value);
  };

  useEffect(() => {
    if (!vs_currency) return;
    setCoinValue('');
    setCurrencyValue('');
  }, [vs_currency]);

  return (
    <div className="bg-gray-400 p-8">
      <div>가격 계산</div>
      <div className="mt-3 grid grid-cols-[auto_40px_auto] items-center gap-3">
        <ExchangeInput label={symbol} value={coinValue} onChangeInput={handleCoinValueChange} />
        <div className="flex w-full items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center">
            <img className="object-contain" src={ExchangeImage} alt="exchange-image" />
          </span>
        </div>
        <ExchangeInput label={vs_currency} value={currencyValue} onChangeInput={handleCurrencyValueChange} />
      </div>
    </div>
  );
};

export default CoinDetailExchange;
