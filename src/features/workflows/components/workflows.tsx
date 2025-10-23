"use client";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { Workflow } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const workflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreateWorkflow = () => {
    workflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (err) => {
        handleError(err);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreateWorkflow}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={workflow.isPending}
      />
    </>
  );
};

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  );
};

export const WorkflowsPagination = () => {
  const { data: workflows, isFetching } = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={isFetching}
      totalPages={workflows.totalPages}
      page={workflows.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView />;
};

export const WorkflowsError = () => {
  return <ErrorView message="Error loading Workflows" />;
};

export const WorkflowsEmpty = () => {
  const { mutate: createWorkflow } = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  return (
    <>
      {modal}
      <EmptyView
        entity="workflow"
        message="No workflows found. Create a workflow to get started"
        onNew={() =>
          createWorkflow(undefined, {
            onError: (err) => {
              handleError(err);
            },
          })
        }
      />
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const { mutate: remove, isPending } = useRemoveWorkflow();

  const handleRemove = () => {
    remove({ id: data.id });
  };

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          &bull; Updated{" "}
          {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={isPending}
    />
  );
};
