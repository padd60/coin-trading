import { CoinListRequestParam } from 'src/entity/coin-list/model';
import { useListBookmarkStore } from 'src/entity/coin-list/store/list-bookmark';
import { useListSettingStore } from 'src/entity/coin-list/store/list-setting';
import ListSettingSelect from 'src/feature/coin-list/ui/list-setting-select';
import CoinListTable from 'src/widget/coin-list/ui/coin-list-table';

const CoinBookmarkList = () => {
  const { setting } = useListSettingStore();
  const { bookmarkList, isExistBookmark, addBookmark, removeBookmark } = useListBookmarkStore();

  const handleBookmarkClick = (coinId: string) => {
    if (isExistBookmark(coinId)) {
      removeBookmark(coinId);
    } else {
      addBookmark(coinId);
    }
  };

  const coinListParams = {
    ...setting,
    price_change_percentage: '1h,24h,7d',
    precision: '2',
    order: 'market_cap_desc',
  } satisfies CoinListRequestParam;

  return (
    <div className="h-full w-full">
      <ListSettingSelect />
      <CoinListTable coinListParams={coinListParams} onClickBookmark={handleBookmarkClick} filterIds={bookmarkList} />
    </div>
  );
};

export default CoinBookmarkList;
