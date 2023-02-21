export const GameUtils = {
  create: (numPlayers: number) => {
    const cards = {
      0: [],
      1: [],
      2: [],
    };

    switch (numPlayers) {
      case 2: {
        return {
          cards,
          nobles: [], // len=3
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
          nobles: [], // len=4
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
          nobles: [], // len = 4
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
