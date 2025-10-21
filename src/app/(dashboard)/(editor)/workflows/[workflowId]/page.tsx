import { requireAuth } from "@/lib/auth-utils";

interface WorkflowPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const WorkflowPage = async ({ params }: WorkflowPageProps) => {
  await requireAuth();

  const { workflowId } = await params;
  return <div>Workflow Id: {workflowId}</div>;
};

export default WorkflowPage;
