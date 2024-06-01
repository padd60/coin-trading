// src/store/useCounterStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ListBookmarkState = {
  bookmarkList: string[];
  addBookmark: (value: string) => void;
  removeBookmark: (value: string) => void;
  isExistBookmark: (value: string) => boolean;
  reset: () => void;
};

export const useListBookmarkStore = create(
  persist<ListBookmarkState>(
    (set, get) => ({
      bookmarkList: [],
      addBookmark: (value: string) =>
        set((state) => {
          if (state.bookmarkList.includes(value)) return state;
          return { ...state, bookmarkList: [...state.bookmarkList, value] };
        }),
      removeBookmark: (value: string) =>
        set((state) => {
          const copy = [...state.bookmarkList];

          const targetIndex = copy.findIndex((id) => id === value);

          if (targetIndex < 0) return state;

          copy.splice(targetIndex, 1);

          return { ...state, bookmarkList: copy };
        }),
      isExistBookmark: (value: string) => get().bookmarkList.includes(value),
      reset: () =>
        set(() => ({
          bookmarkList: [],
        })),
    }),
    {
      name: 'coin-list-bookmark-store',
    },
  ),
);
