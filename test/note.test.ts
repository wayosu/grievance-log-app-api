import { expect, describe, it, beforeEach, afterEach } from 'bun:test'
import { NoteTest, UserTest } from './test-util'
import app from '../src'

describe('POST /api/notes', () => {
    beforeEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.create()
    })

    afterEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.delete()
    })

    it('should rejected if note is invalid', async () => {
        const response = await app.request('/api/notes', {
            method: 'post',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                title: '',
                description: ''
            })
        })
        
        expect(response.status).toBe(400)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should success if note is valid', async () => {
        const response = await app.request('/api/notes', {
            method: 'post',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                title: 'Test Judul Catatan',
                description: 'Test Deskripsi Catatan'
            })
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.id).toBeDefined()
        expect(body.data.title).toBe('Test Judul Catatan')
        expect(body.data.description).toBe('Test Deskripsi Catatan')
        expect(body.data.slug).toBeDefined()
        expect(body.data.created_at).toBeDefined()
        expect(body.data.updated_at).toBeDefined()
    })
})

describe('GET /api/notes', () => {
    beforeEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.create()
        await NoteTest.create()
    })

    afterEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.delete()
    })

    it('should get 404 if note is not found', async () => {
        const note = await NoteTest.get()
        const response = await app.request('/api/notes/' + (note.id + 1), {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(404)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should success if note is exist', async () => {
        const note = await NoteTest.get()
        const response = await app.request('/api/notes/' + note.id, {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.id).toBeDefined()
        expect(body.data.title).toBe(note.title)
        expect(body.data.description).toBe(note.description)
        expect(body.data.slug).toBeDefined()
        expect(body.data.created_at).toBeDefined()
        expect(body.data.updated_at).toBeDefined()
    })
})

describe('PUT /api/notes/{id}', () => {
    beforeEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.create()
        await NoteTest.create()
    })

    afterEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.delete()
    })

    it('should rejected update note if request is invalid', async () => {
        const note = await NoteTest.get()
        const response = await app.request('/api/notes/' + note.id, {
            method: 'put',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                title: '',
                description: 'Test Deskripsi Catatan'
            })
        })
        
        expect(response.status).toBe(400)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should rejected update note if id is not found', async () => {
        const note = await NoteTest.get()
        const response = await app.request('/api/notes/' + (note.id + 1), {
            method: 'put',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                title: 'Test Judul Catatan',
                description: 'Test Deskripsi Catatan'
            })
        })
        
        expect(response.status).toBe(404)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should success update note if request is valid', async () => {
        const note = await NoteTest.get()
        const response = await app.request('/api/notes/' + note.id, {
            method: 'put',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                title: 'Test Judul Catatan',
                description: 'Test Deskripsi Catatan'
            })
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.id).toBeDefined()
        expect(body.data.title).toBe('Test Judul Catatan')
        expect(body.data.description).toBe('Test Deskripsi Catatan')
        expect(body.data.slug).toBeDefined()
        expect(body.data.created_at).toBeDefined()
        expect(body.data.updated_at).toBeDefined()
    })
})

describe('', async () => {
    beforeEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.create()
        await NoteTest.create()
    })

    afterEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.delete()
    })

    it('should rejected if note is not found', async () => {
        const note = await NoteTest.get()
        const response = await app.request('/api/notes/' + (note.id + 1), {
            method: 'delete',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(404)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should success if note is exist', async () => {
        const note = await NoteTest.get()
        const response = await app.request('/api/notes/' + note.id, {
            method: 'delete',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBe(true)
    })
})

describe('GET /api/notes', () => {
    beforeEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.create()
        await NoteTest.createMany(25)
    })

    afterEach(async () => {
        await NoteTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to search note', async () => {
        const response = await app.request('/api/notes', {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data.length).toBe(10)
        expect(body.paging.current_page).toBe(1)
        expect(body.paging.size).toBe(10)
        expect(body.paging.total_page).toBe(3)
    })

    it('should be able to search note using title', async () => {
        const response = await app.request('/api/notes?title=test', {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data.length).toBe(10)
        expect(body.paging.current_page).toBe(1)
        expect(body.paging.size).toBe(10)
        expect(body.paging.total_page).toBe(3)
    })
    
    it('should be able to search without result', async () => {
        const response = await app.request('/api/notes?title=lorem', {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data.length).toBe(0)
        expect(body.paging.current_page).toBe(1)
        expect(body.paging.size).toBe(10)
        expect(body.paging.total_page).toBe(0)
    })

    it('should be able to search with paging', async () => {
        let response = await app.request('/api/notes?page=2&size=5', {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(200)

        let body = await response.json()
        expect(body.data.length).toBe(5)
        expect(body.paging.current_page).toBe(2)
        expect(body.paging.size).toBe(5)
        expect(body.paging.total_page).toBe(5)

        response = await app.request('/api/notes?page=5', {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })

        expect(response.status).toBe(200)

        body = await response.json()
        expect(body.data.length).toBe(0)
        expect(body.paging.current_page).toBe(5)
        expect(body.paging.size).toBe(10)
        expect(body.paging.total_page).toBe(3)

        response = await app.request('/api/notes?size=5', {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })

        expect(response.status).toBe(200)

        body = await response.json()
        expect(body.data.length).toBe(5)
        expect(body.paging.current_page).toBe(1)
        expect(body.paging.size).toBe(5)
        expect(body.paging.total_page).toBe(5)
    })
})
