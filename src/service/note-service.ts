import { CreateNoteRequest, NoteResponse, SearchNoteRequest, UpdateNoteRequest, toNoteResponse } from "../model/note-model";
import { NoteValidation } from "../validation/note-validation";
import { prismaClient } from "../application/database"
import { HTTPException } from "hono/http-exception"
import { Note, User } from "@prisma/client"
import { Pageable } from "../model/page-model";

export class NoteService {
    static async create(user: User, request: CreateNoteRequest): Promise<NoteResponse> {
        request = NoteValidation.CREATE.parse(request)

        const data = {
            ...request,
            ...{
                slug: request.title
                    .toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '')
                    .replace(/--+/g, '-')
                    .replace(/^-+|-+$/g, ''),
                created_at: new Date(),
                updated_at: new Date(),
                username: user.username
            }
        }

        const note = await prismaClient.note.create({
            data: data
        })

        return toNoteResponse(note)
    }

    static async noteMustExist(user: User, noteId: number): Promise<Note> {
        const note = await prismaClient.note.findFirst({
            where: {
                id: noteId,
                username: user.username
            }
        })

        if (!note) {
            throw new HTTPException(404, {
                message: 'Note not found'
            })
        }

        return note
    }

    static async get(user: User, noteId: number): Promise<NoteResponse> {
        noteId = NoteValidation.GET.parse(noteId)

        const note = await this.noteMustExist(user, noteId)

        return toNoteResponse(note)
    }

    static async update(user: User, request: UpdateNoteRequest): Promise<NoteResponse> {
        request = NoteValidation.UPDATE.parse(request)

        await this.noteMustExist(user, request.id)

        const note = await prismaClient.note.update({
            where: {
                username: user.username,
                id: request.id
            },
            data: {
                ...request,
                updated_at: new Date()
            }
        })

        return toNoteResponse(note)
    }
    
    static async delete(user: User, noteId: number): Promise<boolean> {
        noteId = NoteValidation.DELETE.parse(noteId)

        await this.noteMustExist(user, noteId)

        await prismaClient.note.delete({
            where: {
                id: noteId,
                username: user.username
            }
        })

        return true
    }

    static async search(user: User, request: SearchNoteRequest): Promise<Pageable<NoteResponse>> {
        request = NoteValidation.SEARCH.parse(request)

        const filters = [];

        if (request.title) {
            filters.push({
                title: {
                    contains: request.title
                }
            })
        }

        const skip = (request.page - 1) * request.size

        const notes = await prismaClient.note.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: request.size,
            skip: skip
        })

        const total = await prismaClient.note.count({
            where: {
                username: user.username,
                AND: filters
            }
        })

        return {
            data: notes.map(note => toNoteResponse(note)),
            paging: {
                current_page: request.page,
                size: request.size,
                total_page: Math.ceil(total / request.size)
            }
        }
    }
}
