export interface User {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    roles: string[];
}
export type UserLogin={
    email: string;
    password: string;
}
export type UserLoginResponse = {
    user: User;
    token: string;
    expiresIn: number;
}
export type UserRegister={
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
