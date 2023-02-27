import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { useMemo } from 'react';
import { CommunityBoard } from './Board';
import { Splendor } from './Game';

export default function () {
  const ClientInstance = useMemo(
    () =>
      Client({
        game: Splendor,
        board: CommunityBoard,
        loading: function () {
          return (
            <div className="w-screen h-screen flex justify-center items-center">
              Loading...
            </div>
          );
        },
        // matchID
        // numPlayers
        // playerID
        multiplayer: Local(),
      }),
    []
  );

  return (
    <div className="flex flex-col gap-8 border-gray-500 divide-y">
      <ClientInstance playerID="0" matchID="0" />
      <ClientInstance playerID="1" matchID="0" />
    </div>
  );
}
