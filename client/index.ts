import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../server"

// Pass Approuter as generic to let the `trpc` object know
// which procedures are available on the server and their input/output types
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
})

const user = await trpc.userById.query("1")
console.log({ user })

const createdUser = await trpc.userCreate.mutate({ name: "Zac" })
console.log({ createdUser })
