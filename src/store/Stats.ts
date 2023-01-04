type Stats = {
  gamePlayed: number;
  wins: number;
  loses: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
};

const KEY = "wordle_stats" as const;

const initialState: Stats = {
  gamePlayed: 0,
  wins: 0,
  loses: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
};

export const getStats = (): Stats => {
  const item = localStorage.getItem(KEY);

  if (item === null) {
    localStorage.setItem(KEY, JSON.stringify(initialState));
    return initialState;
  }

  return JSON.parse(item);
};

const setStats = (input: Stats) => {
  localStorage.setItem(KEY, JSON.stringify(input));
};

export const updateStatsWonGame = (attempt: number) => {
  const stats = getStats();

  const newStats: Stats = {
    ...stats,
    gamePlayed: stats.gamePlayed + 1,
    wins: stats.wins + 1,
    currentStreak: stats.currentStreak + 1,
    maxStreak: Math.max(stats.currentStreak + 1, stats.maxStreak),
    guessDistribution: {
      ...stats.guessDistribution,
      [attempt]: stats.guessDistribution[attempt] + 1,
    },
  };

  setStats(newStats);
};

export const updateStatsLoseGame = () => {
  const stats = getStats();

  const newStats: Stats = {
    ...stats,
    gamePlayed: stats.gamePlayed + 1,
    loses: stats.loses + 1,
    currentStreak: 0,
  };

  setStats(newStats);
};
