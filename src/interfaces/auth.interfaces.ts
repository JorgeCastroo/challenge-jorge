import { IUser, IUserCreate, IUserResponse } from "./user.interfaces";


export interface ILoginParams {
    email: string;
    password: string;
}


export interface ILoginResponse {
    token: string;
    user: IUserResponse;
}

export interface ITokenJwt {
    userId: string;
    iat: number;
    exp: number;
}



export interface AuthRepository {
    create(user:IUserCreate):Promise<IUserResponse>;
    login({ email, password }: ILoginParams): Promise<IUser | null>;
}