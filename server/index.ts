import { z } from "zod"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { db } from "./db"
import { publicProcedure, router } from "./trpc"

const appRouter = router({
  // Query procedure that returns a list of users from our db
  userList: publicProcedure.query(async () => {
    // Retrieve users from our imaginary database
    const users = await db.user.findMany()
    return users
  }),
  // Query procedure that returns a user matching the input id
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts
    // Retrieve the user with the given ID
    const user = await db.user.findById(input)
    return user
  }),
  // Mutation procedure that creates a new user
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts
      const user = await db.user.create(input)
      return user
    }),
})

// Create a simple server
const server = createHTTPServer({
  router: appRouter,
})

server.listen(3000)

// Export router type
export type AppRouter = typeof appRouter
