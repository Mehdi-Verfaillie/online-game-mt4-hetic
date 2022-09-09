import { Player } from './player';

export interface Game {
  id: string;
  players: Player[];
  status: 'available' | 'ongoing' | 'unavailable';
}

export type NextRoundEvent = 'end:round:fail' | 'end:round:success';

export type NextRoundOutput = { current: number; next: number };
