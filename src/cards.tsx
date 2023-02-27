import { range } from 'lodash-es';
import { FC } from 'react';
import { DevelopmentCards, NobleCards } from './constants';
import { Gems, ID, Level } from './types';
import { keys } from './utils';

export const NobleCard: FC<{ id: ID }> = ({ id }) => {
  const card = NobleCards[id];

  return (
    <div className="border rounded h-28 w-28 py-1 px-2">
      <div className="text-xl font-bold align-top">{card.point}</div>

      <div className="flex flex-col gap-1">
        {keys(card.price).map(
          (gem) =>
            card.price[gem] > 0 && (
              <div
                key={gem}
                style={{ backgroundColor: Gems[gem].color }}
                className={`${gem} w-5 h-5 flex justify-center items-center`}
              >
                {card.price[gem]}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export const DevelopmentCard: FC<{ id: ID; onClick: () => void }> = ({
  id,
  onClick,
}) => {
  const card = DevelopmentCards[id];
  const color = Gems[card.gem].color;

  return (
    <div className="border rounded h-36 w-28 p-2" onClick={onClick}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold">
          {card.point > 0 ? card.point : ''}
        </span>
        <div className="w-4 h-4" style={{ backgroundColor: color }} />
      </div>

      <div className="flex flex-col gap-1">
        {keys(card.price).map(
          (gem) =>
            card.price[gem] > 0 && (
              <div
                style={{ backgroundColor: Gems[gem].color }}
                key={gem}
                className={`${gem} w-5 h-5 flex justify-center items-center`}
              >
                {card.price[gem]}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export const LevelCard: FC<{ level: Level }> = ({ level }) => (
  <div className="w-28 h-36 flex justify-center items-center border rounded gap-2">
    {range(level + 1).map((num) => (
      <div className="w-4 h-4 rounded-full bg-gray-500" key={num} />
    ))}
  </div>
);
