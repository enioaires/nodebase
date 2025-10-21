"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const Client = () => {
  const trpc = useTRPC();
  const ai = useMutation(
    trpc.testAi.mutationOptions({
      onError: () => {
        toast.error("Something went wrong");
      },
    }),
  );
  return (
    <div>
      <Button disabled={ai.isPending} onClick={() => ai.mutate()}>
        Test Ai
      </Button>
    </div>
  );
};
