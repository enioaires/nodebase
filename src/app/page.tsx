import { requireAuth } from "@/lib/auth-utils";
import React from "react";
import { Client } from "./client";

const Page = async () => {
  await requireAuth();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-12">
      <p>Protect</p>
      <Client />
    </div>
  );
};

export default Page;
