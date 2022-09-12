export interface Player {
  id: string;
  name: string;
  role: 'owner' | 'member';
  lifePoint: number;
  isPlayingRound: boolean;
}
