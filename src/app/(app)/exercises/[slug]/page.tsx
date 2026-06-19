import { ExerciseDetailView } from "@/features/exercise-library/components/ExerciseDetailView";

type ExerciseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExerciseDetailPage({ params }: ExerciseDetailPageProps) {
  const { slug } = await params;

  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <ExerciseDetailView slug={decodeURIComponent(slug)} />
    </main>
  );
}
