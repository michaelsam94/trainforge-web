import { PlanDayWorkoutContainer } from "@/features/workout-logging/components/PlanDayWorkoutContainer";

type PlanDayPageProps = {
  params: Promise<{ dayId: string }>;
};

export default async function PlanDayPage({ params }: PlanDayPageProps) {
  const { dayId } = await params;
  return <PlanDayWorkoutContainer dayId={dayId} />;
}
