export type ExerciseLocation = "home" | "gym" | "both";
export type ExerciseDifficulty = "easy" | "medium" | "hard";

export type ExerciseSummary = {
  id: string;
  slug: string;
  name: string;
  category: string;
  muscleGroup: string | null;
  utility: string | null;
  mechanics: string | null;
  forceType: string | null;
  preparation: string | null;
  execution: string | null;
  instructions: string[];
  equipments: string[];
  location: ExerciseLocation;
  difficulty: ExerciseDifficulty;
  sourceUrl: string;
  thumbnailUrl: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  vimeoId: string | null;
};

export type ExercisesResponse = {
  total: number;
  count: number;
  exercises: ExerciseSummary[];
};

export type ExerciseResponse = {
  exercise: ExerciseSummary;
};

export type ExerciseListParams = {
  q?: string;
  category?: string;
  muscleGroup?: string;
  location?: ExerciseLocation;
  difficulty?: ExerciseDifficulty;
  limit?: number;
  offset?: number;
};
