import { ThreadDetailContainer } from "@/features/community/components/ThreadDetailContainer";

type ThreadPageProps = {
  params: Promise<{ threadId: string }>;
};

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { threadId } = await params;

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <ThreadDetailContainer threadId={threadId} />
    </main>
  );
}
