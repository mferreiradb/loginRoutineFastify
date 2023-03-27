import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import UsersRoutes from './routes/Users.routes';

const app = fastify();

app.register(fastifyJwt, {
	secret: 'askjdkas 21873561872v787812t312 1267vsdrasd 121276fe612r37612r6712r867'
});

app.register(UsersRoutes, {
	prefix: 'users'
});

app.listen({
	port: 4444
}).then(() => console.log('Server running: http://localhost:4444'));