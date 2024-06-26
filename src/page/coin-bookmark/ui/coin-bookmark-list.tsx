import { CoinListRequestParam } from 'src/entity/coin-list/model';
import { useListBookmarkStore } from 'src/shared/store/list-bookmark';
import { useListSettingStore } from 'src/shared/store/list-setting';
import CoinListTable from 'src/widget/coin-list/ui/coin-list-table';
import ListNone from 'src/widget/coin-list/ui/list-none';
import { useShallow } from 'zustand/react/shallow';

const CoinBookmarkList = () => {
  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));
  const per_page = useListSettingStore(useShallow((state) => state.setting.per_page));
  const { bookmarkList } = useListBookmarkStore();

  const coinListParams = {
    vs_currency,
    per_page,
    price_change_percentage: '1h,24h,7d',
    precision: '2',
    order: 'market_cap_desc',
  } satisfies CoinListRequestParam;

  return (
    <div className="h-full w-full">
      {bookmarkList.length > 0 ? (
        <CoinListTable coinListParams={coinListParams} filterIds={bookmarkList} />
      ) : (
        <ListNone />
      )}
    </div>
  );
};

export default CoinBookmarkList;
