import { prisma } from "../database/prisma-client";
import { ILoginParams } from "../interfaces/auth.interfaces";
import { IUser, IUserCreate, IUserResponse } from "../interfaces/user.interfaces";


class AuthRepositoryPrisma {

    async create(user: IUserCreate): Promise<IUserResponse> {
        const result = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
        const { password: userPassword, ...userWithoutPassword } = result;

        return userWithoutPassword
    }


  async login({
    email,
  }:ILoginParams):Promise<IUser | null> {

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
  
    return user || null;
    
    }
}
export { AuthRepositoryPrisma };
