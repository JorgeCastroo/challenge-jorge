import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from "zod";
import { AuthRepository, ILoginParams, ILoginResponse } from "../interfaces/auth.interfaces";
import { IUserCreate, IUserResponse, UserRepository } from '../interfaces/user.interfaces';
import { AuthRepositoryPrisma } from "../repositories/auth.repository";
import { UserRepositoryPrisma } from '../repositories/user.repository';
import { BadRequestError } from '../utils/statusErrors';

export class AuthUseCase {
    private authRepository: AuthRepository;
    private userRepository: UserRepository
    constructor() {
        this.authRepository = new AuthRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({ name, email, password  }: IUserCreate): Promise<IUserResponse> {

        const schemaCreateUser = z.object({
            name: z.string().min(1, "Nome é obrigatório"),
            email: z.string().email("Email inválido"),
            password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").nonempty("Senha é obrigatória"),
        });

        try {
            await schemaCreateUser.parse({ email, name, password });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map(e => `${e.message}`).join(', ');
                throw new BadRequestError(errorMessages);
            }
            throw error;
        } const verifyUserExists = await this.userRepository.findByEmail(email);
        if (verifyUserExists) {
            throw new BadRequestError('Email já exjste');
        }

        const result = await this.authRepository.create({ name, email, password });

        return result;
    }

    async login({ email, password }: ILoginParams): Promise<ILoginResponse> {
        const user = await this.authRepository.login({ email, password });
        if (!user) {
            throw new BadRequestError('Email ou senha incorretos');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new BadRequestError('Email ou senha incorretos');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '7d' });
    
        const { password:userPassword, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}