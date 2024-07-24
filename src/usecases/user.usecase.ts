import { z } from "zod";
import { IUserCreate, IUserResponse, UserRepository } from "../interfaces/user.interfaces";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { BadRequestError } from "../utils/statusErrors";

export class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }
 

    async findAll(): Promise<IUserResponse[]> {
        const result = await this.userRepository.findAll();
        return result;
    }

 

    async delete(userId: string): Promise<void> {
        const verifyUserExists = (await this.userRepository.findAll()).find(user => user.id === userId);
        if (!verifyUserExists) {
            throw new BadRequestError('Usuário não encontrado');
        }
        await this.userRepository.delete(userId);
    }

    async update(userId: string, { name, email, password }: IUserCreate): Promise<IUserResponse> {
        const schemaCreateUser = z.object({
            name: z.string().min(1, "Nome é obrigatório"),
            email: z.string().email("Email inválido"),
            password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").nonempty("Senha é obrigatória"),
        });

        const verifyUserExists = (await this.userRepository.findAll()).find(user => user.id === userId);

        if (!verifyUserExists) {
            throw new BadRequestError('Usuário não encontrado');
        }

        try {
            await schemaCreateUser.parse({ email, name, password });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map(e => `${e.message}`).join(', ');
                throw new BadRequestError(errorMessages);
            }
            throw error;
        }

        const result = await this.userRepository.update(userId, { name, email, password });

        return result;
    }
}