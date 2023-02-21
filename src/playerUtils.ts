import { v4 } from 'uuid';
import type { Player } from './types';

export const PlayerUtils = {
  create: (name: string): Player => {
    return {
      id: v4(),
      name,
      gems: {
        Gold: 0,
        Diamond: 0,
        Emerald: 0,
        Onyx: 0,
        Ruby: 0,
        Sapphire: 0,
      },
      cards: [],
      nobles: [],
      reserved: [],
      _points: 0,
      _gemCount: 0,
    };
  },
};
