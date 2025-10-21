import { requireAuth } from "@/lib/auth-utils";

interface ExecutionPageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const ExecutionPage = async ({ params }: ExecutionPageProps) => {
  await requireAuth();
  const { executionId } = await params;
  return <div>Execution Id: {executionId}</div>;
};

export default ExecutionPage;
