import { Select, SelectItem } from '@nextui-org/react';
import { CoinCurrency } from 'src/entity/coin-list/model';
import { PerPageSelect } from '../model';
import { useListSettingStore } from 'src/shared/store/list-setting';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

type ListSettingSelectProps = {
  filterSelect?: Array<'view' | 'currency' | 'per-page' | 'all'>;
};
const ListSettingSelect = ({ filterSelect = ['all'] }: ListSettingSelectProps) => {
  const navigate = useNavigate();
  const vs_currency = useListSettingStore(useShallow((state) => state.setting.vs_currency));
  const per_page = useListSettingStore(useShallow((state) => state.setting.per_page));
  const updateSetting = useListSettingStore((state) => state.updateSetting);

  const viewType: Array<{ key: string; label: string }> = [
    { key: 'home', label: '전체 보기' },
    { key: 'bookmark', label: '북마크 보기' },
  ];

  const currencyType: Array<{ key: CoinCurrency; label: string }> = [
    { key: 'krw', label: 'KRW 보기' },
    { key: 'usd', label: 'USD 보기' },
  ];

  const perPageType: Array<{ key: PerPageSelect; label: string }> = [
    { key: 10, label: '10개 보기' },
    { key: 30, label: '30개 보기' },
    { key: 50, label: '50개 보기' },
  ];

  const handleViewSelectChange = (key: string) => {
    if (key === 'home') return;

    navigate('/bookmark');
  };

  const handleCurrencySelectChange = (key: CoinCurrency) => {
    updateSetting({ vs_currency: key });
  };

  const handlePerPageSelectChange = (key: PerPageSelect) => {
    updateSetting({ per_page: key });
  };

  return (
    <div className="flex justify-end py-3">
      {filterSelect.includes('all') || filterSelect.includes('view') ? (
        <Select
          placeholder="보기 유형을 선택해주세요"
          className="max-w-52"
          defaultSelectedKeys={['home']}
          classNames={{
            trigger: 'bg-white shadow-none',
          }}
          onSelectionChange={([key]) => {
            handleViewSelectChange(key as string);
          }}
        >
          {viewType.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
      ) : null}
      {filterSelect.includes('all') || filterSelect.includes('currency') ? (
        <Select
          placeholder="통화를 선택해주세요"
          className="max-w-52"
          defaultSelectedKeys={[vs_currency]}
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
      ) : null}
      {filterSelect.includes('all') || filterSelect.includes('per-page') ? (
        <Select
          placeholder="몇개씩 볼지 선택해주세요"
          className="max-w-52"
          defaultSelectedKeys={[String(per_page)]}
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
      ) : null}
    </div>
  );
};

export default ListSettingSelect;
