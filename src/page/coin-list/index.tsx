import { useGetCoinList } from 'src/entity/coin-list/query/useGetCoinList';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';
import { CoinCurrency } from 'src/entity/coin-list/model';
import { useListSettingStore } from 'src/entity/coin-list/store/list-setting';
import { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/select';

const CoinList = () => {
  const { setting, updateSetting } = useListSettingStore();

  const { data: coinList } = useGetCoinList({
    ...setting,
    price_change_percentage: '1h,24h,7d',
    precision: '2',
    order: 'market_cap_desc',
  });

  const allCoinList = coinList.pages.flatMap((items) => items);

  const convertPercentage = (value?: number) => (value ? `${Math.round(value * 10) / 10}%` : '');

  const convertLocalePrice = (value: number, currency: CoinCurrency) =>
    currency === 'krw' ? `₩${value.toLocaleString()}` : `$${value.toLocaleString()}`;

  const currencyType: Array<{ key: CoinCurrency; label: string }> = [
    { key: 'krw', label: 'KRW 보기' },
    { key: 'usd', label: 'USD 보기' },
  ];

  const perPageType: Array<{ key: 10 | 30 | 50; label: string }> = [
    { key: 10, label: '10개 보기' },
    { key: 30, label: '30개 보기' },
    { key: 50, label: '50개 보기' },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Select
          placeholder="통화를 선택해주세요"
          className="max-w-52"
          defaultSelectedKeys={['krw']}
          classNames={{
            trigger: 'bg-white shadow-none',
          }}
        >
          {currencyType.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
        <Select
          placeholder="몇개씩 볼지 선택해주세요"
          className="max-w-52"
          defaultSelectedKeys={['50']}
          classNames={{
            trigger: 'bg-white shadow-none',
          }}
        >
          {perPageType.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
      </div>
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
          {allCoinList.map(
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
                <TableCell>
                  <StarCheckbox />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{symbol.toLocaleUpperCase()}</TableCell>
                <TableCell className="w-fit text-end">
                  {convertLocalePrice(current_price, setting.vs_currency)}
                </TableCell>
                <TableCell className="w-fit text-end">
                  {convertPercentage(price_change_percentage_1h_in_currency)}
                </TableCell>
                <TableCell className="w-fit text-end">
                  {convertPercentage(price_change_percentage_7d_in_currency)}
                </TableCell>
                <TableCell className="w-fit text-end">
                  {convertPercentage(price_change_percentage_24h_in_currency)}
                </TableCell>
                <TableCell className="w-fit text-end">
                  {convertLocalePrice(total_volume, setting.vs_currency)}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const StarCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
      <span className="checkmark inline-block" />
    </label>
  );
};

export default CoinList;
