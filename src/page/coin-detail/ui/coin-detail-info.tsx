import { useParams } from 'react-router-dom';
import { useGetCoinDetail } from 'src/entity/coin-detail/query/useGetCoinDetail';
import ListSettingSelect from 'src/feature/coin-list/ui/list-setting-select';
import CoinDetailHeader from 'src/widget/coin-detail/ui/coin-detail-header';
import CoinDetailContent from 'src/widget/coin-detail/ui/coin-detail-content';
import CoinDetailExchange from 'src/widget/coin-detail/ui/coin-detail-exchange';
import CoinDetailDescription from 'src/widget/coin-detail/ui/coin-detail-description';

const CoinDetailInfo = () => {
  const params = useParams();

  const { data: coinInfo } = useGetCoinDetail(params.id ?? '');

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
        <CoinDetailContent
          market_data={coinInfo.market_data}
          market_cap_rank={coinInfo.market_cap_rank}
          links={coinInfo.links}
        />
        <CoinDetailExchange symbol={coinInfo.symbol} market_data={coinInfo.market_data} />
        <CoinDetailDescription description={coinInfo.description} />
      </div>
    </div>
  );
};

export default CoinDetailInfo;
