import { INVALID_MOVE } from 'boardgame.io/core';
import type { Game } from 'boardgame.io';
import { GameUtils } from './gameUtils';
import { PlayerUtils } from './playerUtils';
import { GameState, Gem, Gems, ID, Player } from './types';
import { DevelopmentCards } from './constants';
import { range } from 'lodash-es';

export const Splendor: Game<GameState, {}> = {
  name: 'splendor',

  setup: ({ ctx, random }) => {
    const board = GameUtils.create(ctx.numPlayers, random.Shuffle);
    const players = {} as Record<ID, Player>;

    // FIXME pass player IDs into game.
    for (let idx = 0; idx < ctx.numPlayers; idx += 1) {
      const player = PlayerUtils.create(`${idx}`);
      players[idx] = player;
    }

    return {
      ...board,
      players,
    };
  },

  minPlayers: 2,
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    // TODO select action == highlight a card when a player select it.

    take: ({ G, playerID, events }, gems: Gem[]) => {
      if (gems.includes('Gold')) return INVALID_MOVE;

      if (
        gems.length === 3 &&
        (gems[0] === gems[1] || gems[0] === gems[2] || gems[1] === gems[2])
      ) {
        return INVALID_MOVE;
      }

      const player = G.players[playerID];

      // todo -- allow swap
      if (player._gemCount + gems.length > 10) return INVALID_MOVE;

      // take
      for (let gem of gems) {
        player.gems[gem] += 1;
      }

      PlayerUtils.aggregate(player);
      events.endTurn();
    },

    reserve: ({ G, playerID, events }, cardId: ID) => {
      const player = G.players[playerID];
      const card = DevelopmentCards[cardId];

      if (player.reserved.length >= 3) return INVALID_MOVE;

      if (G.gems.Gold > 0) {
        G.gems.Gold -= 1;
        player.gems.Gold += 1;
      }

      // move card into player's reserved
      player.reserved.push(cardId);
      G.cards[card.level] = G.cards[card.level].filter((c) => c !== cardId);

      PlayerUtils.aggregate(player);
      events.endTurn();
    },

    buy: ({ G, playerID, events }, cardId: ID) => {
      // TODO validate
      const card = DevelopmentCards[cardId];
      const player = G.players[playerID];
      const gems = range(7).flatMap(() => Object.keys(Gems)) as Gem[];

      if (!PlayerUtils.canBuy({ player, card, gems })) return INVALID_MOVE;

      player.cards.push(cardId);
      G.cards[card.level] = G.cards[card.level].filter((c) => c !== cardId);

      PlayerUtils.aggregate(player);
      events.endTurn();
    },
  },

  endIf: ({ G }) => {
    const winner = Object.values(G.players).find(
      (player) => player._points >= 15
    );

    if (!winner) {
      return;
    }

    return {
      winner: winner.id,
    };
  },

  deltaState: true,
};
