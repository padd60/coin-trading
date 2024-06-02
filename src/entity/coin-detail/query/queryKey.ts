import { createQueryKeys } from '@lukemorales/query-key-factory';
import { DefaultQueryKeys } from 'src/shared/model';

type CoinDetailScheme = {
  id: (id: string) => [string];
};

export const coinDetail = createQueryKeys<DefaultQueryKeys, CoinDetailScheme>('coin-detail', {
  id: (id: string) => [id],
});
