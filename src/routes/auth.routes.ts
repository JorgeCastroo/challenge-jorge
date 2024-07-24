import bcrypt from 'bcrypt';
import { FastifyInstance } from "fastify";
import { ILoginParams } from "../interfaces/auth.interfaces";
import { IUserCreate } from "../interfaces/user.interfaces";
import { AuthUseCase } from "../usecases/auth.usecase";



export async function authRoutes(fastify:FastifyInstance){
    const authUseCase = new AuthUseCase();

    fastify.post<{ Body: IUserCreate }>('/register', async (request, reply) => {
        try {
            const { name, email,password } = request.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await authUseCase.create({
                name,
                email,
                password: hashedPassword,
            });
            reply.code(201).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }
    )


    fastify.post<{Body:ILoginParams}>('/login', async (request, reply) => {
        try {
            const { email, password } = request.body;
            const data = await authUseCase.login({ email, password });
            reply.send(data)
        } catch (error) {
            
            reply.code(500).send(error)
        }})


}