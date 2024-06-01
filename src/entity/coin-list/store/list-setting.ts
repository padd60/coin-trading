// src/store/useCounterStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CoinListRequestParam } from '../model';

type ListSettingType = Pick<CoinListRequestParam, 'vs_currency' | 'per_page'>;

type ListSettingState = {
  setting: ListSettingType;
  updateSetting: (value: ListSettingType) => void;
};

export const useListSettingStore = create(
  persist<ListSettingState>(
    (set) => ({
      setting: {
        vs_currency: 'krw',
        per_page: 50,
      },
      updateSetting: (value: ListSettingType) => set((state) => ({ ...state, ...value })),
    }),
    {
      name: 'list-setting-store',
    },
  ),
);
