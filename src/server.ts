import fastify from "fastify";

import routes from "./routes/router";
import errorHandler from "./middlewares/ErrorHandler";

const app = fastify()

app.register(routes, { prefix: "/api" })
app.setErrorHandler(errorHandler)

const port = process.env.PORT ? Number(process.env.PORT) : 8080

app.listen({
    host: "0.0.0.0",
    port: port
}).then(() => {
    console.log(`HTTP Server running on port ${port}`)
})