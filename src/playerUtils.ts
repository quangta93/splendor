import { v4 } from 'uuid';
import { DevelopmentCards, NobleCards } from './constants';
import type { DevelopmentCard, Gem, Player } from './types';
import { keys } from './utils';

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
      _gemCount: 0,
      cards: [],
      _permanentGems: {
        Gold: 0,
        Diamond: 0,
        Emerald: 0,
        Onyx: 0,
        Ruby: 0,
        Sapphire: 0,
      },
      nobles: [],
      reserved: [],
      _points: 0,
    };
  },

  aggregate: (player: Player): void => {
    player._points =
      player.cards.reduce((acc, id) => DevelopmentCards[id].point + acc, 0) +
      player.nobles.reduce((acc, id) => NobleCards[id].point + acc, 0);

    player._gemCount = Object.values(player.gems).reduce(
      (acc, count) => acc + count,
      0
    );

    player._permanentGems = {
      Gold: 0,
      Diamond: 0,
      Emerald: 0,
      Onyx: 0,
      Ruby: 0,
      Sapphire: 0,
    };
    player.cards.forEach((id) => {
      const card = DevelopmentCards[id];
      player._permanentGems[card.gem] += 1;
    });
  },

  canBuy: ({
    player,
    card,
    gems,
  }: {
    player: Player;
    card: DevelopmentCard;
    gems: Gem[];
  }): boolean => {
    const payingGems = { ...player._permanentGems };
    for (const gem of gems) {
      payingGems[gem] += 1;
    }

    return keys(card.price).every((gem) => payingGems[gem] >= card.price[gem]);
  },
};
