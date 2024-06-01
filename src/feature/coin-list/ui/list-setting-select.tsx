import { Select, SelectItem } from '@nextui-org/react';
import { CoinCurrency } from 'src/entity/coin-list/model';
import { useListSettingStore } from 'src/entity/coin-list/store/list-setting';
import { PerPageSelect } from '../model';

const ListSettingSelect = () => {
  const { setting, updateSetting } = useListSettingStore();

  const currencyType: Array<{ key: CoinCurrency; label: string }> = [
    { key: 'krw', label: 'KRW 보기' },
    { key: 'usd', label: 'USD 보기' },
  ];

  const perPageType: Array<{ key: PerPageSelect; label: string }> = [
    { key: 10, label: '10개 보기' },
    { key: 30, label: '30개 보기' },
    { key: 50, label: '50개 보기' },
  ];

  const handleCurrencySelectChange = (key: CoinCurrency) => {
    updateSetting({ ...setting, vs_currency: key });
  };

  const handlePerPageSelectChange = (key: PerPageSelect) => {
    updateSetting({ ...setting, per_page: key });
  };

  return (
    <div className="flex justify-end py-3">
      <Select
        placeholder="통화를 선택해주세요"
        className="max-w-52"
        defaultSelectedKeys={[setting.vs_currency]}
        classNames={{
          trigger: 'bg-white shadow-none',
        }}
        onSelectionChange={([key]) => {
          handleCurrencySelectChange(key as CoinCurrency);
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
        onSelectionChange={([key]) => {
          handlePerPageSelectChange(key as PerPageSelect);
        }}
      >
        {perPageType.map((type) => (
          <SelectItem key={type.key}>{type.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ListSettingSelect;
