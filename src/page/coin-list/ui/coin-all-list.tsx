import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CoinListRequestParam } from 'src/entity/coin-list/model';
import { coinList } from 'src/entity/coin-list/query/queryKey';
import ListSettingSelect from 'src/feature/coin-list/ui/list-setting-select';
import { useListBookmarkStore } from 'src/shared/store/list-bookmark';
import { useListSettingStore } from 'src/shared/store/list-setting';
import CoinListTable from 'src/widget/coin-list/ui/coin-list-table';
import { useShallow } from 'zustand/react/shallow';

const CoinAllList = () => {
  const queryClient = useQueryClient();
  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));
  const per_page = useListSettingStore(useShallow((state) => state.setting.per_page));
  const { isExistBookmark, addBookmark, removeBookmark } = useListBookmarkStore();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: coinList.list.queryKey });
  }, [queryClient, vs_currency, per_page]);

  const coinListParams = {
    vs_currency,
    per_page,
    price_change_percentage: '1h,24h,7d',
    precision: '2',
    order: 'market_cap_desc',
  } satisfies CoinListRequestParam;

  const handleBookmarkClick = (coinId: string) => {
    if (isExistBookmark(coinId)) {
      removeBookmark(coinId);
      toast.success('북마크가 해제되었습니다.');
    } else {
      addBookmark(coinId);
      toast.success('북마크가 추가되었습니다.');
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
