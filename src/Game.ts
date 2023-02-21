import { INVALID_MOVE } from 'boardgame.io/core';
import type { Game } from 'boardgame.io';
import { GameUtils } from './gameUtils';
import { PlayerUtils } from './playerUtils';
import type { DevelopmentCard, GameState, Gem, Player } from './types';

export const Splendor: Game<GameState, {}> = {
  name: 'splendor',

  setup: ({ ctx }, {}) => {
    const players = {} as Record<string, Player>;

    for (let i = 0; i < ctx.numPlayers; i++) {
      const player = PlayerUtils.create(`player ${i + 1}`);
      players[player.id] = player;
    }

    return {
      players,
      ...GameUtils.create(ctx.numPlayers),
    };
  },

  seed: '02202023',

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    take: ({ G, playerID }, gems: Gem[]) => {
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

      player._gemCount += gems.length;
    },

    reserve: ({ G, playerID, events }, card: DevelopmentCard) => {
      const player = G.players[playerID];

      if (player.reserved.length >= 3) return INVALID_MOVE;

      if (G.gems.Gold > 0) {
        G.gems.Gold -= 1;
        player.gems.Gold += 1;
        player._gemCount += 1;
      }

      // move card into player's reserved
      player.reserved.push(card);
      G.cards[card.level] = G.cards[card.level].filter((c) => c.id !== card.id);
      events.endTurn();
    },

    buy: ({ G, playerID }, card: DevelopmentCard, gems: Gem[]) => {
      // validate
      const player = G.players[playerID];

      player._points += card.point;
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
