interface User {
    id: number,
    email: string,
    userName: string,
    password: string,
}

let users: User[] = [];
let userIdCounter = 0;

export const getAllUsers = (): User[] => {
    return users;
}

export const getUserByUserName = (userName: string): User | undefined => {
    return users.find((user) => user.userName === userName);
}

export const createUser = (email: string, userName: string, password: string): User => {
    const user: User = {
        id: userIdCounter,
        email,
        userName,
        password
    };
    users.push(user);
    userIdCounter++;
    return user;
}