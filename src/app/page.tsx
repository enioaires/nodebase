import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import React from "react";

const Page = async () => {
  await requireAuth();

  const data = await caller.getAccount();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-12">
      <p>Protect</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
