import { DevelopmentCardsByLevels, NobleCards } from './constants';
import { Shuffle } from './types';

export const GameUtils = {
  create: (numPlayers: number, shuffle: Shuffle) => {
    const cards = {
      0: shuffle([...DevelopmentCardsByLevels[0]]).map((c) => c.id),
      1: shuffle([...DevelopmentCardsByLevels[1]]).map((c) => c.id),
      2: shuffle([...DevelopmentCardsByLevels[2]]).map((c) => c.id),
    };

    const nobles = shuffle(Object.values(NobleCards)).map((c) => c.id);

    switch (numPlayers) {
      case 2: {
        return {
          cards,
          nobles: nobles.slice(0, 3), // len=3
          gems: {
            Gold: 5,
            Diamond: 4,
            Emerald: 4,
            Onyx: 4,
            Ruby: 4,
            Sapphire: 4,
          },
        };
      }

      case 3: {
        return {
          cards,
          nobles: nobles.slice(0, 4), // len=4
          gems: {
            Gold: 5,
            Diamond: 5,
            Emerald: 5,
            Onyx: 5,
            Ruby: 5,
            Sapphire: 5,
          },
        };
      }

      default: {
        return {
          cards,
          nobles: nobles.slice(0, 4), // len=4
          gems: {
            Gold: 5,
            Diamond: 7,
            Emerald: 7,
            Onyx: 7,
            Ruby: 7,
            Sapphire: 7,
          },
        };
      }
    }
  },
};
