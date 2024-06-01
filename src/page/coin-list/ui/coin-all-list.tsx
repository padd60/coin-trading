import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, Suspense } from 'react';
import { CoinListRequestParam } from 'src/entity/coin-list/model';
import { coinList } from 'src/entity/coin-list/query/queryKey';
import { useListBookmarkStore } from 'src/entity/coin-list/store/list-bookmark';
import { useListSettingStore } from 'src/entity/coin-list/store/list-setting';
import ListSettingSelect from 'src/feature/coin-list/ui/list-setting-select';
import CoinListTable from 'src/widget/coin-list/ui/coin-list-table';

const CoinAllList = () => {
  const queryClient = useQueryClient();

  const { setting } = useListSettingStore();
  const { isExistBookmark, addBookmark, removeBookmark } = useListBookmarkStore();

  const coinListParams = {
    ...setting,
    price_change_percentage: '1h,24h,7d',
    precision: '2',
    order: 'market_cap_desc',
  } satisfies CoinListRequestParam;

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: coinList.list.queryKey });
  }, [coinListParams, queryClient]);

  const handleBookmarkClick = (coinId: string) => {
    if (isExistBookmark(coinId)) {
      removeBookmark(coinId);
    } else {
      addBookmark(coinId);
    }
  };

  return (
    <div className="h-full w-full">
      <ListSettingSelect />
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

export default CoinAllList;
