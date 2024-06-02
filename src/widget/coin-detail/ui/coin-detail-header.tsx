import toast from 'react-hot-toast';
import { CoinDetailResponse } from 'src/entity/coin-detail/model';
import { useListBookmarkStore } from 'src/shared/store/list-bookmark';
import { useListSettingStore } from 'src/shared/store/list-setting';
import BookmarkCheckBox from 'src/shared/ui/bookmark-check-box';
import { useShallow } from 'zustand/react/shallow';

type CoinDetailHeaderProps = Pick<CoinDetailResponse, 'id' | 'image' | 'localization' | 'symbol'>;

const CoinDetailHeader = ({ id, image, localization, symbol }: CoinDetailHeaderProps) => {
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

  return (
    <div className="flex w-full items-center gap-2">
      <span
        onClick={() => {
          handleBookmarkClick(id);
        }}
      >
        <BookmarkCheckBox check={isExistBookmark(id)} />
      </span>
      <img src={image.thumb} alt="coin-image" />
      <span className="text-xl font-bold">{`${
        vs_currency === 'krw' ? localization.ko : localization.en
      } (${symbol.toLocaleUpperCase()})`}</span>
    </div>
  );
};

export default CoinDetailHeader;
