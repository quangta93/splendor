import { groupBy } from 'lodash-es';
import DCards from './assets/development-cards.json';
import Nobles from './assets/nobles.json';
import { DevelopmentCard, ID, NobleCard } from './types';

export const NobleCards = Nobles as Record<ID, NobleCard>;
export const DevelopmentCards = DCards as Record<ID, DevelopmentCard>;

export const DevelopmentCardsByLevels = groupBy(
  Object.values(DevelopmentCards),
  'level'
);
