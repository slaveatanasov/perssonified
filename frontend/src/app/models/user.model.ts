export interface UserRegister {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
}

export interface UserLogin {
    email: string,
    password: string,
    tfaToken?: string
}

export interface User {
    id: number,
    username: string,
    email: string,
    tfaEnabled: boolean | number,
    tfaSecret?: string,
    tfaTempSecrt?: string,
    createdAt: string,
    updatedAt: string
}