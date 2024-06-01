// src/store/useCounterStore.ts
import { create } from 'zustand';
import { CoinListRequestParam } from '../model';

type ListSettingType = Pick<CoinListRequestParam, 'vs_currency' | 'per_page'>;

type ListSettingState = {
  setting: ListSettingType;
  updateSetting: (value: ListSettingType) => void;
  reset: () => void;
};

export const useListSettingStore = create<ListSettingState>((set) => ({
  setting: {
    vs_currency: 'krw',
    per_page: 50,
  },
  updateSetting: (value: ListSettingType) => set((state) => ({ setting: { ...state.setting, ...value } })),
  reset: () =>
    set(() => ({
      setting: {
        vs_currency: 'krw',
        per_page: 50,
      },
    })),
}));
