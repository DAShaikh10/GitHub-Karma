export type Config = {
  height: number;
  width: number;
};

export type KarmaCardInput = {
  currentRankScore: number;
  description: string;
  login: string;
  nextRankScore: number;
  rank: string;
  rankDescription: string;
  rankLogoSrc: string;
  rankProgress: number;
  title: string;
};

export type Theme = {
  bgColor: string;
  borderColor: string;
  iconColor: string;
  textColor: string;
  titleColor: string;
};
