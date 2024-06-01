import { CoinCurrency, CoinListRequestParam } from 'src/entity/coin-list/model';
import { Suspense, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { useQueryClient } from '@tanstack/react-query';
import { coinList } from 'src/entity/coin-list/query/queryKey';
import { Spinner } from '@nextui-org/react';
import { useListSettingStore } from 'src/entity/coin-list/store/list-setting';
import CoinListTable from 'src/widget/coin-list/ui/coin-list-table';
import { PerPageSelect } from './model';
import { useListBookmarkStore } from 'src/entity/coin-list/store/list-bookmark';

const CoinList = () => {
  const queryClient = useQueryClient();

  const { setting, updateSetting } = useListSettingStore();
  const { bookmarkList, addBookmark, removeBookmark } = useListBookmarkStore();

  const coinListParams = {
    ...setting,
    price_change_percentage: '1h,24h,7d',
    precision: '2',
    order: 'market_cap_desc',
  } satisfies CoinListRequestParam;

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: coinList.list.queryKey });
  }, [coinListParams, queryClient]);

  const currencyType: Array<{ key: CoinCurrency; label: string }> = [
    { key: 'krw', label: 'KRW 보기' },
    { key: 'usd', label: 'USD 보기' },
  ];

  const perPageType: Array<{ key: PerPageSelect; label: string }> = [
    { key: 10, label: '10개 보기' },
    { key: 30, label: '30개 보기' },
    { key: 50, label: '50개 보기' },
  ];

  const handleCurrencySelectChange = (key: CoinCurrency) => {
    updateSetting({ ...setting, vs_currency: key });
  };

  const handlePerPageSelectChange = (key: PerPageSelect) => {
    updateSetting({ ...setting, per_page: key });
  };

  const handleBookmarkClick = (coinId: string) => {
    if (bookmarkList.includes(coinId)) {
      removeBookmark(coinId);
    } else {
      addBookmark(coinId);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex justify-end py-3">
        <Select
          placeholder="통화를 선택해주세요"
          className="max-w-52"
          defaultSelectedKeys={[setting.vs_currency]}
          classNames={{
            trigger: 'bg-white shadow-none',
          }}
          onSelectionChange={([key]) => {
            handleCurrencySelectChange(key as CoinCurrency);
          }}
        >
          {currencyType.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
        <Select
          placeholder="몇개씩 볼지 선택해주세요"
          className="max-w-52"
          defaultSelectedKeys={['50']}
          classNames={{
            trigger: 'bg-white shadow-none',
          }}
          onSelectionChange={([key]) => {
            handlePerPageSelectChange(key as PerPageSelect);
          }}
        >
          {perPageType.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
      </div>
      <Suspense
        fallback={
          <div className="flex h-[600px] w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <CoinListTable coinListParams={coinListParams} onClickBookmark={handleBookmarkClick} />
      </Suspense>
    </div>
  );
};

export default CoinList;
