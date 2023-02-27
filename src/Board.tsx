import { BoardProps } from 'boardgame.io/react';
import { ComponentType } from 'react';
import { DevelopmentCard, LevelCard, NobleCard } from './cards';
import { GemList } from './gems';
import { CardLevels, GameState } from './types';

type BoardComponentType = ComponentType<BoardProps<GameState>>;

export const CommunityBoard: BoardComponentType = ({ G, ctx, moves }) => {
  return (
    <div className="border rounded p-2">
      <h1 className="text-2xl font-bold mb-4">Community Board</h1>

      <div className="flex gap-8">
        <div className="cards flex-1">
          <div className="flex gap-4 mb-4">
            {G.nobles.map((id) => (
              <NobleCard key={id} id={id} />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {[...CardLevels].reverse().map((level) => (
              <div key={level} className="flex gap-4">
                <LevelCard level={level} />
                {G.cards[level].slice(0, 4).map((id) => (
                  <DevelopmentCard
                    key={id}
                    id={id}
                    onClick={() => {
                      const res = moves.buy(id);
                      console.log(res);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <GemList gems={G.gems} />
      </div>
    </div>
  );
};
