import { Hono } from 'hono'
import { CreateNoteRequest, SearchNoteRequest, UpdateNoteRequest } from '../model/note-model'
import { ApplicationVariables } from '../model/app-model'
import { authMiddleware } from '../middleware/auth-middleware'
import { NoteService } from '../service/note-service'
import { User } from '@prisma/client'

export const noteController = new Hono<{ Variables: ApplicationVariables }>()

noteController.use(authMiddleware)

noteController.post('/api/notes', async (c) => {
    const user = c.get('user') as User
    const request = await c.req.json() as CreateNoteRequest

    // kirim ke service
    const response = await NoteService.create(user, request)

    // return response
    return c.json({
        data: response
    })
})

noteController.get('/api/notes/:id', async (c) => {
    const user = c.get('user') as User
    const noteId = Number(c.req.param('id'))

    // kirim ke service
    const response = await NoteService.get(user, noteId)

    // return response
    return c.json({
        data: response
    })
})

noteController.put('/api/notes/:id', async (c) => {
    const user = c.get('user') as User
    const noteId = Number(c.req.param('id'))
    const request = await c.req.json() as UpdateNoteRequest
    request.id = noteId

    // kirim ke service
    const response = await NoteService.update(user, request)

    // return response
    return c.json({
        data: response
    })
})

noteController.delete('/api/notes/:id', async (c) => {
    const user = c.get('user') as User
    const noteId = Number(c.req.param('id'))

    // kirim ke service
    const response = await NoteService.delete(user, noteId)

    // return response
    return c.json({
        data: response
    })
})

noteController.get('/api/notes', async (c) => {
    const user = c.get('user') as User
    const request: SearchNoteRequest = {
        title: c.req.query('title'),
        page: c.req.query('page') ? Number(c.req.query('page')) : 1,
        size: c.req.query('size') ? Number(c.req.query('size')) : 10
    }

    // kirim ke service
    const response = await NoteService.search(user, request)

    // return response
    return c.json(response)
})
