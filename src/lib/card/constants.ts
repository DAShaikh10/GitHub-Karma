export const CONFIG = {
  error: {
    height: 175,
    width: 388,
  },
  creator: {
    height: 175,
    width: 388,
  },
  clientError: {
    height: 175,
    width: 388,
  },
} as const;

/*
  Color themes for the Karma card.
  The themes have been directly taken from the wonderful GitHub Readme Stats Project by Anurag Hazra.
  Credits: https://github.com/anuraghazra/github-readme-stats
*/
export const THEME = {
  default: {
    bgColor: "#fffefe",
    borderColor: "#e4e2e2",
    titleColor: "#2f80ed",
    textColor: "#434d58",
    iconColor: "#4c71f2",
  },
} as const;
