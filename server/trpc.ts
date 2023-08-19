import { initTRPC } from "@trpc/server"

// Initialize tRPC backend
const t = initTRPC.create()

// Exportable router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
