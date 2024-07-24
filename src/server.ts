import fastifyCors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';

import * as dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { validateToken } from './utils/validadeToken';

dotenv.config();

const app: FastifyInstance = fastify({ logger: true });

app.register(fastifyCors, {
    origin: true,
  });
  

app.register(authRoutes, {
    prefix: '/auth'
})

app.get('/', async (request, reply) => {
    return {
        message: 'Hello World',
    }
}
)

app.register(async function (fastify) {
    fastify.addHook('preHandler', validateToken);
    fastify.register(userRoutes, { prefix: '/users' });
   
});

app.listen({
    port: 4000,
    host:"0.0.0"
},
    () => console.log('Server is running on port 4000'),
)