import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { CoinDetailResponse } from 'src/entity/coin-detail/model';
import { useListSettingStore } from 'src/shared/store/list-setting';
import { useShallow } from 'zustand/react/shallow';
import { removeHtmlTags } from '../lib/utils';

type CoinDetailDescriptionProps = Pick<CoinDetailResponse, 'description'>;

const CoinDetailDescription = ({ description }: CoinDetailDescriptionProps) => {
  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));

  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetailClick = () => {
    setShowDetail((current) => !current);
  };

  return (
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
        <pre className="w-full text-wrap p-5">{removeHtmlTags(description[vs_currency === 'krw' ? 'ko' : 'en'])}</pre>
      ) : null}
    </div>
  );
};

export default CoinDetailDescription;
