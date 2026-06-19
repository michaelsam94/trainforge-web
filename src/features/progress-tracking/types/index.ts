export type StreakResult = {
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate: string | null;
};

export type SkillRadar = {
  strength: number;
  endurance: number;
  mobility: number;
  consistency: number;
};

export type WeeklyVolumePoint = {
  weekStart: string;
  workouts: number;
  sets: number;
};

export type ProgressSummary = {
  adherence: { completed: number; target: number; percent: number };
  totals: { workouts: number; sets: number; volumeKg: number };
  weeklyVolume: WeeklyVolumePoint[];
  skillRadar: SkillRadar;
  streaks: StreakResult;
};

export type WorkoutHistoryItem = {
  id: string;
  title: string;
  completedAt: string;
  setCount: number;
  difficultyRating?: number;
};

export type WorkoutHistoryResponse = {
  items: WorkoutHistoryItem[];
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
};

export type BadgesResponse = {
  badges: Badge[];
};
