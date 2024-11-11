import { Note } from "@prisma/client";
import { prismaClient } from "../src/application/database";

export class UserTest {
    static async create() {
        await prismaClient.user.create({
            data: {
                username: 'test',
                name: 'test',
                password: await Bun.password.hash('test123', {
                    algorithm: 'bcrypt',
                    cost: 10
                }),
                token: 'test'
            }
        })
    }

    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: 'test'
            }
        })
    }
}

export class NoteTest {
    static async create() {
        await prismaClient.note.create({
            data: {
                title: 'test',
                slug: 'test',
                description: 'test',
                username: 'test'
            }
        })
    }

    static async createMany(n: number) {
        for (let i = 0; i < n; i++) {
            await prismaClient.note.create({
                data: {
                    title: 'test ' + i,
                    slug: 'test-'+i,
                    description: 'test' + i,
                    username: 'test'
                }
            })
        }
    }

    static async get(): Promise<Note> {
        return prismaClient.note.findFirstOrThrow({
            where: {
                username: 'test'
            }
        })
    }

    static async deleteAll() {
        await prismaClient.note.deleteMany({
            where: {
                username: 'test'
            }
        })
    }
}
