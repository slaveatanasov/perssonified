export interface UserRegister {
    email: string,
    password: string,
    passwordConfirm: string;
}

export interface UserLogin {
    email: string,
    password: string;
}