import { Button, Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useGetCoinDetail } from 'src/entity/coin-detail/query/useGetCoinDetail';
import ListSettingSelect from 'src/feature/coin-list/ui/list-setting-select';
import { useListBookmarkStore } from 'src/shared/store/list-bookmark';
import { useListSettingStore } from 'src/shared/store/list-setting';
import BookmarkCheckBox from 'src/shared/ui/bookmark-check-box';
import {
  convertLocalePrice,
  convertLocaleVolume,
  convertPercentage,
  cutSecondDecimal,
  percentageStyle,
} from 'src/widget/coin-list/lib/utils';
import { useShallow } from 'zustand/react/shallow';
import ExchangeImage from 'src/shared/assets/exchange.png';
import { useCallback, useEffect, useState } from 'react';
import { removeHtmlTags } from '../lib/utils';

const CoinDetailInfo = () => {
  const params = useParams();

  const { data: coinInfo } = useGetCoinDetail(params.id ?? '');

  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));
  const { isExistBookmark, addBookmark, removeBookmark } = useListBookmarkStore();

  const handleBookmarkClick = (coinId: string) => {
    if (isExistBookmark(coinId)) {
      removeBookmark(coinId);
      toast.success('북마크가 해제되었습니다.');
    } else {
      addBookmark(coinId);
      toast.success('북마크가 추가되었습니다.');
    }
  };

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
      <div className="flex w-full items-center gap-2">
        <span
          onClick={() => {
            handleBookmarkClick(coinInfo.id);
          }}
        >
          <BookmarkCheckBox check={isExistBookmark(coinInfo.id)} />
        </span>
        <img src={coinInfo.image.thumb} alt="coin-image" />
        <span className="text-xl font-bold">{`${
          vs_currency === 'krw' ? coinInfo.localization.ko : coinInfo.localization.en
        } (${coinInfo.symbol.toLocaleUpperCase()})`}</span>
      </div>
      <ListSettingSelect filterSelect={['currency']} />
      <div className="flex w-full flex-col gap-3">
        {/* 여기부터 상세 표 */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="border">
            <div className="grid grid-cols-[150px_auto] border-b">
              <span className="bg-gray-300 p-5 font-bold">시가총액 Rank</span>
              <span className="p-5">{`Rank #${coinInfo.market_cap_rank}`}</span>
            </div>
            <div className="grid grid-cols-[150px_auto]">
              <span className="bg-gray-300 p-5 font-bold">웹사이트</span>
              <a
                className="inline-block truncate p-5"
                href={coinInfo.links.homepage[0]}
                target="_blank"
                rel="noreferrer"
              >
                {coinInfo.links.homepage[0]}
              </a>
            </div>
          </div>
          <div className="flex flex-col flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold">
                  {convertLocalePrice(coinInfo.market_data.current_price[vs_currency], vs_currency)}
                </span>
                <span
                  className={percentageStyle(coinInfo.market_data.price_change_percentage_24h_in_currency[vs_currency])}
                >
                  {convertPercentage(coinInfo.market_data.price_change_percentage_24h_in_currency[vs_currency])}
                </span>
              </div>
            </div>
            <div className="grid w-full grid-cols-2">
              <div className="flex flex-col items-end text-sm">
                <span>시가총액</span>
                <span>{convertLocalePrice(coinInfo.market_data.total_volume[vs_currency], vs_currency)}</span>
              </div>
              <div className="flex flex-col items-end text-sm">
                <span>24시간 거래대금</span>
                <span>
                  {convertLocaleVolume(
                    coinInfo.market_data.market_cap_change_24h_in_currency[vs_currency],
                    vs_currency,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
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
