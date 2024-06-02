import { TableRow, TableCell, Table, TableBody, TableColumn, TableHeader, Button } from '@nextui-org/react';
import { CoinListRequestParam } from 'src/entity/coin-list/model';
import { useGetCoinList } from 'src/entity/coin-list/query/useGetCoinList';
import ListNone from './list-none';
import { useListBookmarkStore } from 'src/shared/store/list-bookmark';
import { useNavigate } from 'react-router-dom';
import { convertLocalePrice, percentageStyle, convertPercentage, convertLocaleVolume } from '../lib/utils';
import CheckBookmark from 'src/feature/coin-list/ui/check-bookmark';
import toast from 'react-hot-toast';

type CoinListTableProps = {
  coinListParams: CoinListRequestParam;
  filterIds?: string[];
};

const CoinListTable = ({ coinListParams, filterIds }: CoinListTableProps) => {
  const { isExistBookmark, removeBookmark, addBookmark } = useListBookmarkStore();
  const { data: coins, fetchNextPage } = useGetCoinList(coinListParams);

  const allCoinList = coins.pages.flatMap((items) => items);

  const resultCoinList = filterIds ? allCoinList.filter((item) => filterIds.includes(item.id)) : allCoinList;

  const navigate = useNavigate();

  const handleClickCoinName = (coinId: string) => {
    navigate(`/detail/${coinId}`);
  };

  const handleBookmarkClick = (coinId: string) => {
    if (isExistBookmark(coinId)) {
      removeBookmark(coinId);
      toast.success('북마크가 해제되었습니다.');
    } else {
      addBookmark(coinId);
      toast.success('북마크가 추가되었습니다.');
    }
  };

  return resultCoinList.length > 0 ? (
    <>
      <Table>
        <TableHeader>
          <TableColumn width={30} align="center">
            {null}
          </TableColumn>
          <TableColumn>자산</TableColumn>
          <TableColumn>{null}</TableColumn>
          <TableColumn className="text-end">Price</TableColumn>
          <TableColumn className="text-end">1H</TableColumn>
          <TableColumn className="text-end">24H</TableColumn>
          <TableColumn className="text-end">7D</TableColumn>
          <TableColumn className="text-end">24H Volume</TableColumn>
        </TableHeader>
        <TableBody>
          {resultCoinList.map(
            ({
              id,
              name,
              symbol,
              current_price,
              price_change_percentage_1h_in_currency,
              price_change_percentage_7d_in_currency,
              price_change_percentage_24h_in_currency,
              market_cap_change_24h,
            }) => (
              <TableRow key={id}>
                <TableCell>
                  <CheckBookmark id={id} onClickBookmark={handleBookmarkClick} check={isExistBookmark(id)} />
                </TableCell>
                <TableCell
                  className="cursor-pointer font-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickCoinName(id);
                  }}
                >
                  {name}
                </TableCell>
                <TableCell>{symbol.toLocaleUpperCase()}</TableCell>
                <TableCell className="w-fit text-end font-bold">
                  {convertLocalePrice(current_price, coinListParams.vs_currency)}
                </TableCell>
                <TableCell className={percentageStyle(price_change_percentage_1h_in_currency)}>
                  {convertPercentage(price_change_percentage_1h_in_currency)}
                </TableCell>
                <TableCell className={percentageStyle(price_change_percentage_7d_in_currency)}>
                  {convertPercentage(price_change_percentage_7d_in_currency)}
                </TableCell>
                <TableCell className={percentageStyle(price_change_percentage_24h_in_currency)}>
                  {convertPercentage(price_change_percentage_24h_in_currency)}
                </TableCell>
                <TableCell className="w-fit text-end font-bold">
                  {convertLocaleVolume(market_cap_change_24h, coinListParams.vs_currency)}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      {!filterIds ? (
        <Button
          className="mt-3 border bg-white p-4"
          style={{
            height: 'fit-content',
          }}
          fullWidth={true}
          onClick={() => {
            fetchNextPage();
          }}
        >
          + 더보기
        </Button>
      ) : null}
    </>
  ) : (
    <ListNone />
  );
};

export default CoinListTable;
