import { apiClient } from "@/shared/lib/apiClient";
import type {
  ExerciseListParams,
  ExerciseResponse,
  ExercisesResponse,
} from "@/features/exercise-library/types";

export async function fetchExercises(
  params: ExerciseListParams = {},
): Promise<ExercisesResponse> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.muscleGroup) search.set("muscleGroup", params.muscleGroup);
  if (params.location) search.set("location", params.location);
  if (params.difficulty) search.set("difficulty", params.difficulty);
  if (params.limit) search.set("limit", String(params.limit));
  if (params.offset) search.set("offset", String(params.offset));

  const query = search.toString();
  return apiClient.get<ExercisesResponse>(`/exercises${query ? `?${query}` : ""}`);
}

export async function fetchExercise(slug: string): Promise<ExerciseResponse> {
  return apiClient.get<ExerciseResponse>(`/exercises/${encodeURIComponent(slug)}`);
}
