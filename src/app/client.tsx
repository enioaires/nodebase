"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export const Client = () => {
  const trpc = useTRPC();
  const ai = useMutation(trpc.testAi.mutationOptions());
  return (
    <div>
      <Button disabled={ai.isPending} onClick={() => ai.mutate()}>
        Test Ai
      </Button>
    </div>
  );
};
