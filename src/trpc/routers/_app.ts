import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  getAccount: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
