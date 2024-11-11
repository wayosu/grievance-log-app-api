import { describe, it, expect, afterEach, beforeEach } from 'bun:test'
import app from '../src'
import { logger } from '../src/application/logging'
import { UserTest } from './test-util'

describe('POST /api/users', () => {
    afterEach(async () => {
        await UserTest.delete()
    })

    it('should register a new user', async () => {
        const response = await app.request('/api/users', {
            method: 'post',
            body: JSON.stringify({
                name: '',
                username: '',
                password: ''
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(400)
        expect(body.errors).toBeDefined()
    })

    it('should reject register new user if username already exists', async () => {
        await UserTest.create()

        const response = await app.request('/api/users', {
            method: 'post',
            body: JSON.stringify({
                name: 'test',
                username: 'test',
                password: 'test'
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(400)
        expect(body.errors).toBeDefined()
    })

    it('should register new user success', async () => {
        const response = await app.request('/api/users', {
            method: 'post',
            body: JSON.stringify({
                name: 'test',
                username: 'test',
                password: 'test123'
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data.username).toBe('test')
        expect(body.data.name).toBe('test')
    })
})

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to login', async () => {
        const response = await app.request('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username: 'test',
                password: 'test123'
            })
        })

        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data.token).toBeDefined()
    })

    it('should be rejected if username is wrong', async () => {
        const response = await app.request('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username: 'salah',
                password: 'test123'
            })
        })

        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should be rejected if password is wrong', async () => {
        const response = await app.request('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username: 'test',
                password: 'salah123'
            })
        })

        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })
})

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to get current user', async () => {
        const response = await app.request('/api/users/current', {
            method: 'get',
            headers: {
                Authorization: 'test'
            }
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.username).toBe('test')
        expect(body.data.name).toBe('test')
    })

    it('should not be able to get current user if token is invalid', async () => {
        const response = await app.request('/api/users/current', {
            method: 'get',
            headers: {
                Authorization: 'salah'
            }
        })
        
        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should not be able to get current user if there is no authorization header', async () => {
        const response = await app.request('/api/users/current', {
            method: 'get',
        })
        
        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })
})

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be rejected if request is invalid', async () => {
        const response = await app.request('/api/users/current', {
            method: 'patch',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                name: '',
                password: ''
            })
        })
        
        expect(response.status).toBe(400)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should be able to update name', async () => {
        const response = await app.request('/api/users/current', {
            method: 'patch',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                name: 'wayosu',
            })
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.name).toBe('wayosu')
    })

    it('should be able to update password', async () => {
        let response = await app.request('/api/users/current', {
            method: 'patch',
            headers: {
                Authorization: 'test'
            },
            body: JSON.stringify({
                password: 'wayo123'
            })
        })
        
        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.name).toBe('test')

        response = await app.request('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username: 'test',
                password: 'wayo123'
            })
        })

        expect(response.status).toBe(200)
    })
})

describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to logout', async () => {
        const response = await app.request('/api/users/current', {
            method: 'delete',
            headers: {
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBe(true)
    })

    it('should not be able to logout', async () => {
        let response = await app.request('/api/users/current', {
            method: 'delete',
            headers: {
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBe(true)

        response = await app.request('/api/users/current', {
            method: 'delete',
            headers: {
                'Authorization': 'test'
            }
        })
        
        expect(response.status).toBe(401)
    })
})
