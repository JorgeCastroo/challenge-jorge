import { prisma } from "../database/prisma-client";
import { IUserCreate, IUserResponse, UserRepository } from "../interfaces/user.interfaces";

class UserRepositoryPrisma implements UserRepository {

  
    async findAll(): Promise<IUserResponse[]> {
        const result = await prisma.user.findMany();
        return result;
    }

    async findByEmail(email: string): Promise<IUserResponse | null> {
        const result = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        return result || null;
    }

    async delete(userId: string): Promise<void> {
        await prisma.user.delete({
            where: {
                id: userId
            }
        });
    }

    async update(userId: string, user: IUserCreate): Promise<IUserResponse> {
        const result = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });

        const { password: teste, ...userWithoutPassword } = result;

        return userWithoutPassword
    }
}

export { UserRepositoryPrisma };
