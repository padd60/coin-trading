import { TableRow, TableCell, Table, TableBody, TableColumn, TableHeader, Button } from '@nextui-org/react';
import { CoinCurrency, CoinListRequestParam } from 'src/entity/coin-list/model';
import { useGetCoinList } from 'src/entity/coin-list/query/useGetCoinList';
import ListNone from './list-none';
import BookmarkCheckBox from 'src/feature/coin-list/ui/bookmark-check-box';
import { useListBookmarkStore } from 'src/shared/store/list-bookmark';

type CoinListTableProps = {
  coinListParams: CoinListRequestParam;
  onClickBookmark: (value: string) => void;
  filterIds?: string[];
};

const CoinListTable = ({ coinListParams, onClickBookmark, filterIds }: CoinListTableProps) => {
  const { isExistBookmark } = useListBookmarkStore();
  const { data: coins, fetchNextPage } = useGetCoinList(coinListParams);

  const allCoinList = coins.pages.flatMap((items) => items);

  const resultCoinList = filterIds ? allCoinList.filter((item) => filterIds.includes(item.id)) : allCoinList;

  const convertPercentage = (value?: number) => (value ? `${Math.round(value * 10) / 10}%` : '');

  const convertLocalePrice = (value: number, currency: CoinCurrency) =>
    currency === 'krw' ? `₩${value.toLocaleString()}` : `$${value.toLocaleString()}`;

  const percentageStyle = (value?: number) => {
    const defaultStyle = 'w-fit text-end';

    if (!value) return defaultStyle;

    const percentage = Math.round(value * 10) / 10;

    if (percentage < 0) return `${defaultStyle} text-red-500`;

    if (percentage > 0) return `${defaultStyle} text-blue-500`;

    return defaultStyle;
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
              total_volume,
            }) => (
              <TableRow key={id}>
                <TableCell
                  onClick={(e) => {
                    e.preventDefault();
                    onClickBookmark(id);
                  }}
                >
                  <BookmarkCheckBox check={isExistBookmark(id)} />
                </TableCell>
                <TableCell className="font-bold">{name}</TableCell>
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
                  {convertLocalePrice(total_volume, coinListParams.vs_currency)}
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
