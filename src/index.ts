import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'

import { userController } from './controller/user-controller'
import { noteController } from './controller/note-controller'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', userController)
app.route('/', noteController)

app.onError(async (e, c) => {
    if (e instanceof HTTPException) {
        c.status(e.status)
        return c.json({
            errors: e.message
        })
    } else if (e instanceof ZodError) {
        c.status(400)
        return c.json({
            errors: e.message
        })
    } else {
        c.status(500)
        return c.json({
            errors: e.message
        })
    }
})

export default app
