import { createQueryKeys } from '@lukemorales/query-key-factory';
import { DefaultQueryKeys } from 'src/shared/model';

type CoinListScheme = {
  page: (page: number, perPage: number) => [number, number];
};

export const coinList = createQueryKeys<DefaultQueryKeys, CoinListScheme>('coin-list', {
  page: (page: number, perPage: number) => [page, perPage],
});
