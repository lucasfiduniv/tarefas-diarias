import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createGoalRoute } from "./routes/create-goal";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { createCompletionRoute } from "./routes/create-completion";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";
import "dotenv/config";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(createGoalRoute);
app.register(getWeekSummaryRoute);

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => {
    console.log("HTTP Server running on http://localhost:3333");
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
