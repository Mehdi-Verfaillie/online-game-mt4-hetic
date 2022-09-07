import { Player } from './player';

export interface Game {
  id: string;
  players: Player[];
  status: 'available' | 'ongoing' | 'unavailable';
}
