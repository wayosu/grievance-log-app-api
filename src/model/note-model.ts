import { Note } from "@prisma/client"

export type CreateNoteRequest = {
    title: string,
    description: string
}

export type NoteResponse = {
    id: number,
    title: string,
    slug: string,
    description: string,
    created_at: Date,
    updated_at: Date
}

export type UpdateNoteRequest = {
    id: number,
    title: string,
    description: string,
    updated_at: Date
}

export type SearchNoteRequest = {
    title?: string,
    page: number,
    size: number
}

export function toNoteResponse(note: Note) : NoteResponse {
    return {
        id: note.id,
        title: note.title,
        slug: note.slug,
        description: note.description,
        created_at: note.created_at,
        updated_at: note.updated_at
    }
}

