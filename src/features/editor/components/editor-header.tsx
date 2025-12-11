"use client"
import { Loader2Icon, SaveIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSuspenseWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/use-workflows";

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="ml-auto">
      <Button size={"sm"} disabled={false} onClick={() => { }}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  )
}

export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateWorkflow = useUpdateWorkflowName()

  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(workflow.name);
  const isSavingRef = React.useRef(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (workflow.name && !isEditing) {
      setName(workflow.name);
    }
  }, [workflow.name, isEditing]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (isSavingRef.current) return;

    const trimmedName = name.trim();

    if (trimmedName === workflow.name || !trimmedName) {
      setName(workflow.name);
      setIsEditing(false);
      return;
    }

    isSavingRef.current = true;
    setIsEditing(false);

    try {
      await updateWorkflow.mutateAsync({
        id: workflowId,
        name: trimmedName
      })
    } catch {
      setName(workflow.name)
    } finally {
      isSavingRef.current = false;
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(workflow.name);
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        aria-label="Workflow name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-7 w-auto min-w-[100px] px-2"
        maxLength={30}
        disabled={updateWorkflow.isPending}
      />
    )
  }

  if (updateWorkflow.isPending) {
    return (
      <BreadcrumbItem className="opacity-50">
        <Loader2Icon className="size-4 animate-spin" />
      </BreadcrumbItem>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <BreadcrumbItem
          onDoubleClick={() => setIsEditing(true)}
          className="cursor-pointer hover:text-foreground transition-colors"
        >
          {workflow.name}
        </BreadcrumbItem>
      </TooltipTrigger>
      <TooltipContent>Double-click to update</TooltipContent>
    </Tooltip>
  )
}

export const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link prefetch href={"/workflows"}>
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
      <div className="flex flex-row items-center justify-between gap-x-4 w-full">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
};
