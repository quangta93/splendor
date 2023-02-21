import { useMemo } from 'react';
import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Splendor } from './Game';

export default function () {
  const client = useMemo(
    () =>
      Client({
        game: Splendor,
        // matchID
        // numPlayers
        // playerID
        multiplayer: SocketIO({ server: 'localhost:8000' }),
      }),
    []
  );

  return null;
}
