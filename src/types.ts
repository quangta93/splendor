export const Gems = [
  'Gold',
  'Emerald',
  'Sapphire',
  'Ruby',
  'Diamond',
  'Onyx',
] as const;

export const CardLevels = [0, 1, 2] as const;

export type Gem = (typeof Gems)[number];
export type Level = (typeof CardLevels)[number];

export type NobleCard = {
  id: string;
  point: number;
  price: Record<Gem, number>;
  imageSrc?: string;
};

export type DevelopmentCard = {
  id: string;
  point: number;
  gem: Gem;
  price: Record<Gem, number>;
  level: Level;
  imageSrc?: string;
};

export type Player = {
  id: string;
  name: string;
  gems: Record<Gem, number>;
  cards: DevelopmentCard[];
  nobles: NobleCard[];
  reserved: DevelopmentCard[];
  _points: number;
  _gemCount: number;
};

export type GameState = {
  cards: Record<Level, DevelopmentCard[]>;
  nobles: NobleCard[];
  gems: Record<Gem, number>;
  players: Record<string, Player>;
};
