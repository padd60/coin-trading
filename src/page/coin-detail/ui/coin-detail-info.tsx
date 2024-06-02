import { Button, Input } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useGetCoinDetail } from 'src/entity/coin-detail/query/useGetCoinDetail';
import ListSettingSelect from 'src/feature/coin-list/ui/list-setting-select';
import { useListSettingStore } from 'src/shared/store/list-setting';
import { cutSecondDecimal } from 'src/widget/coin-list/lib/utils';
import { useShallow } from 'zustand/react/shallow';
import ExchangeImage from 'src/shared/assets/exchange.png';
import { useCallback, useEffect, useState } from 'react';
import { removeHtmlTags } from '../lib/utils';
import CoinDetailHeader from 'src/widget/coin-detail/ui/coin-detail-header';
import CoinDetailContent from 'src/widget/coin-detail/ui/coin-detail-content';

const CoinDetailInfo = () => {
  const params = useParams();

  const { data: coinInfo } = useGetCoinDetail(params.id ?? '');

  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));

  const [coinValue, setCoinValue] = useState('');

  const exchangeCoinToCurrency = useCallback(
    (value: string) => {
      const exchangeValue = cutSecondDecimal(Number(value) * coinInfo.market_data.current_price[vs_currency]);
      setCurrencyValue(exchangeValue !== 0 ? String(exchangeValue) : '');
    },
    [coinInfo.market_data.current_price, vs_currency],
  );

  useEffect(() => {
    if (!vs_currency) return;
    exchangeCoinToCurrency(coinValue);
  }, [coinValue, exchangeCoinToCurrency, vs_currency]);

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
    const exchangeValue = cutSecondDecimal(Number(value) / coinInfo.market_data.current_price[vs_currency]);
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

  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetailClick = () => {
    setShowDetail((current) => !current);
  };

  return (
    <div className="h-full w-full p-5">
      <CoinDetailHeader
        id={coinInfo.id}
        image={coinInfo.image}
        localization={coinInfo.localization}
        symbol={coinInfo.symbol}
      />
      <ListSettingSelect filterSelect={['currency']} />
      <div className="flex w-full flex-col gap-3">
        {/* 여기부터 상세 표 */}
        <CoinDetailContent
          market_data={coinInfo.market_data}
          market_cap_rank={coinInfo.market_cap_rank}
          links={coinInfo.links}
        />
        {/* 여기부터 가격 계산표 */}
        <div className="bg-gray-400 p-8">
          <div>가격 계산</div>
          <div className="mt-3 grid grid-cols-[auto_40px_auto] items-center gap-3">
            <div className="flex h-12 items-center">
              <span className="bg-gray-300 p-3 font-bold">{coinInfo.symbol.toLocaleUpperCase()}</span>
              <Input
                classNames={{ inputWrapper: 'rounded-none h-full', base: 'h-full', input: 'text-end' }}
                value={coinValue}
                onChange={handleCoinValueChange}
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <span className="flex h-8 w-8 items-center justify-center">
                <img className="object-contain" src={ExchangeImage} alt="exchange-image" />
              </span>
            </div>
            <div className="flex h-12 items-center">
              <span className="bg-gray-300 p-3 font-bold">{vs_currency.toLocaleUpperCase()}</span>
              <Input
                classNames={{ inputWrapper: 'rounded-none h-full', base: 'h-full', input: 'text-end' }}
                value={currencyValue}
                onChange={handleCurrencyValueChange}
              />
            </div>
          </div>
        </div>
        {/* 여기부터 설명 */}
        <div className="w-full">
          <Button
            className="border bg-white p-4"
            style={{
              height: 'fit-content',
            }}
            fullWidth={true}
            onClick={handleShowDetailClick}
          >
            {showDetail ? '설명닫기' : '설명보기'}
          </Button>
          {showDetail ? (
            <pre className="w-full text-wrap p-5">
              {removeHtmlTags(coinInfo.description[vs_currency === 'krw' ? 'ko' : 'en'])}
            </pre>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CoinDetailInfo;
