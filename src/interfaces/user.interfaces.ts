export interface IUser{
    id:string;
    name:string;
    email:string;
    password:string;
    created_at:Date;
    updated_at:Date;
}

export interface IUserResponse{
    id:string;
    name:string;
    email:string;
    created_at:Date;
    updated_at:Date;

}

export interface IUserCreate{
    name:string;
    email:string;
    password:string;
}
export interface UserRepository{
    findAll():Promise<IUserResponse[]>;
    findByEmail(email:string):Promise<IUserResponse | null>;
    delete(userId:string):Promise<void>;
    update(userId:string,user:IUserCreate):Promise<IUserResponse>;
}