import fastify from "fastify";
import UsersRoutes from "./routes/Users.routes";

const app = fastify();

app.register(UsersRoutes, {
    prefix: 'users'
})

app.listen({
    port: 4444
}).then(() => console.log('Server running: http://localhost:4444'))