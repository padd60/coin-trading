import { createQueryKeys } from '@lukemorales/query-key-factory';
import { DefaultQueryKeys } from 'src/shared/model';

type CoinListScheme = {
  list: null;
};

export const coinList = createQueryKeys<DefaultQueryKeys, CoinListScheme>('coin-list', {
  list: null,
});
