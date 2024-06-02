import { CoinDetailResponse } from 'src/entity/coin-detail/model';
import { useListSettingStore } from 'src/shared/store/list-setting';
import {
  convertLocalePrice,
  percentageStyle,
  convertPercentage,
  convertLocaleVolume,
} from 'src/widget/coin-list/lib/utils';
import { useShallow } from 'zustand/react/shallow';
type CoinDetailContentProps = Pick<CoinDetailResponse, 'market_cap_rank' | 'links' | 'market_data'>;

const CoinDetailContent = ({ market_cap_rank, market_data, links }: CoinDetailContentProps) => {
  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="border">
        <div className="grid grid-cols-[150px_auto] border-b">
          <span className="bg-gray-300 p-5 font-bold">시가총액 Rank</span>
          <span className="p-5">{`Rank #${market_cap_rank}`}</span>
        </div>
        <div className="grid grid-cols-[150px_auto]">
          <span className="bg-gray-300 p-5 font-bold">웹사이트</span>
          <a className="inline-block truncate p-5" href={links.homepage[0]} target="_blank" rel="noreferrer">
            {links.homepage[0]}
          </a>
        </div>
      </div>
      <div className="flex flex-col flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold">
              {convertLocalePrice(market_data.current_price[vs_currency], vs_currency)}
            </span>
            <span className={percentageStyle(market_data.price_change_percentage_24h_in_currency[vs_currency])}>
              {convertPercentage(market_data.price_change_percentage_24h_in_currency[vs_currency])}
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2">
          <div className="flex flex-col items-end text-sm">
            <span>시가총액</span>
            <span>{convertLocalePrice(market_data.total_volume[vs_currency], vs_currency)}</span>
          </div>
          <div className="flex flex-col items-end text-sm">
            <span>24시간 거래대금</span>
            <span>{convertLocaleVolume(market_data.market_cap_change_24h_in_currency[vs_currency], vs_currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailContent;
