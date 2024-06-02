import { useState } from 'react';
import { CoinDetailResponse } from 'src/entity/coin-detail/model';
import { useListSettingStore } from 'src/shared/store/list-setting';
import { useShallow } from 'zustand/react/shallow';
import { removeHtmlTags } from '../lib/utils';
import DetailShowButton from 'src/feature/coin-detail/ui/detail-show-button';

type CoinDetailDescriptionProps = Pick<CoinDetailResponse, 'description'>;

const CoinDetailDescription = ({ description }: CoinDetailDescriptionProps) => {
  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));

  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetailClick = () => {
    setShowDetail((current) => !current);
  };

  return (
    <div className="w-full">
      <DetailShowButton isShow={showDetail} onClickShowButton={handleShowDetailClick} />
      {showDetail ? (
        <pre className="w-full text-wrap p-5">{removeHtmlTags(description[vs_currency === 'krw' ? 'ko' : 'en'])}</pre>
      ) : null}
    </div>
  );
};

export default CoinDetailDescription;
