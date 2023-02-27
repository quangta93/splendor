import { range } from 'lodash-es';
import { FC } from 'react';
import { Gem, Gems } from './types';
import { keys } from './utils';

const Token: FC<{
  gem: Gem;
}> = ({ gem }) => (
  <div
    style={{ backgroundColor: Gems[gem].color }}
    className={`${gem} w-8 h-8 rounded-full flex justify-center items-center`}
    title={Gems[gem].name}
  />
);

export const GemList: FC<{
  gems: Record<Gem, number>;
}> = ({ gems }) => (
  <div className="flex flex-col gap-2">
    {keys(gems).map((gem) => (
      <div className="flex gap-2" key={gem}>
        {range(gems[gem]).map((idx) => (
          <Token gem={gem} key={`${gem}.${idx}`} />
        ))}
      </div>
    ))}
  </div>
);
