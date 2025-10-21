import { requireAuth } from "@/lib/auth-utils";

const WorkflowPage = async () => {
  await requireAuth()
  return <div>Workflows</div>;
};

export default WorkflowPage;
