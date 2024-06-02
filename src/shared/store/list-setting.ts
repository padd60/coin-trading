// src/store/useCounterStore.ts
import { CoinListRequestParam } from 'src/entity/coin-list/model';
import { create } from 'zustand';

type ListSettingType = Pick<CoinListRequestParam, 'vs_currency' | 'per_page'>;

type ListSettingState = {
  setting: ListSettingType;
  updateSetting: (value: Partial<ListSettingType>) => void;
  reset: () => void;
};

export const useListSettingStore = create<ListSettingState>((set) => ({
  setting: {
    vs_currency: 'krw',
    per_page: 50,
  },
  updateSetting: (value: Partial<ListSettingType>) => set((state) => ({ setting: { ...state.setting, ...value } })),
  reset: () =>
    set(() => ({
      setting: {
        vs_currency: 'krw',
        per_page: 50,
      },
    })),
}));
