import { useQuery } from "@tanstack/react-query";
import {
  fetchExercise,
  fetchExercises,
} from "@/features/exercise-library/api/exerciseApi";
import type { ExerciseListParams } from "@/features/exercise-library/types";

export function useExercises(params: ExerciseListParams) {
  return useQuery({
    queryKey: ["exercises", params],
    queryFn: () => fetchExercises(params),
  });
}

export function useExercise(slug: string) {
  return useQuery({
    queryKey: ["exercise", slug],
    queryFn: () => fetchExercise(slug),
    enabled: Boolean(slug),
  });
}
