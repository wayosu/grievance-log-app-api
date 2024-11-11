import { User } from "@prisma/client"

export type RegisterUserRequest = {
    name: string
    username: string
    password: string
}

export type LoginUserRequest = {
    username: string
    password: string
}

export type UpdateUserRequest = {
    name?: string
    password?: string
}

export type UserResponse = {
    username: string
    name: string
    token?: string
}

export function toUserResponse(user: User) : UserResponse {
    return {
        name: user.name,
        username: user.username
    }
}
