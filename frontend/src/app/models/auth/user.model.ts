export interface UserRegister {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string;
}

export interface UserLogin {
    email: string,
    password: string;
}