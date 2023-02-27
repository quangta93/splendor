export const Gems = {
  Gold: { name: 'Gold', color: '#FFD700', imgSrc: '' },
  Emerald: { name: 'Emerald', color: '#059669', imgSrc: '' },
  Sapphire: { name: 'Sapphire', color: '#0F52BA', imgSrc: '' },
  Ruby: { name: 'Ruby', color: '#E0115F', imgSrc: '' },
  Diamond: { name: 'Diamond', color: '#EEEEEE', imgSrc: '' },
  Onyx: { name: 'Onyx', color: '#5C4033', imgSrc: '' },
} as const;

export const CardLevels = [0, 1, 2] as const;

export type Gem = keyof typeof Gems;
export type Level = (typeof CardLevels)[number];

export type ID = string;

export type NobleCard = {
  id: ID;
  point: number;
  price: Record<Gem, number>;
  imageSrc?: string;
};

export type DevelopmentCard = {
  id: ID;
  point: number;
  gem: Gem;
  price: Record<Gem, number>;
  level: Level;
  imageSrc?: string;
};

export type Player = {
  id: ID;
  name: string;
  gems: Record<Gem, number>;
  _gemCount: number;
  cards: ID[];
  _permanentGems: Record<Gem, number>;
  nobles: ID[];
  reserved: ID[];
  _points: number;
};

export type GameState = {
  cards: Record<Level, ID[]>;
  nobles: ID[];
  gems: Record<Gem, number>;
  players: Record<ID, Player>;
};

export type Shuffle = <T>(deck: T[]) => T[];
