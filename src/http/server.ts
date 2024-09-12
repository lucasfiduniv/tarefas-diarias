import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createGoalRoute } from './routes/create-goal'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { createCompletionRoute } from './routes/create-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(createGoalRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running on http://localhost:3333')
})
