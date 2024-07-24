import bcrypt from 'bcrypt';
import { FastifyInstance } from "fastify";
import { IUserCreate } from "../interfaces/user.interfaces";
import { UserUseCase } from "../usecases/user.usecase";

export async function userRoutes(fastify: FastifyInstance) {
    const userUserCase = new UserUseCase();
 
    fastify.get('/', async (request, reply) => {
        try {
            const data = await userUserCase.findAll();
            reply.send(data)
        } catch (error) {
            reply.code(500).send
        }})

  
        fastify.delete<{Params:{id:string}}>('/:id', async (request, reply) => {
            try {
                const { id } = request.params;
                 await userUserCase.delete(id);
                reply.code(200).send({
                    message: "Usuário deletado com sucesso"
                })
            } catch (error) {
                reply.code(500).send(error)
            }
        }
        )

        fastify.put<{ Body: IUserCreate,Params:{id:string} }>('/:id', async (request, reply) => {
            try {
                const { id } = request.params;
                const { name, email, password } = request.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                const data = await userUserCase.update(id, {
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
}