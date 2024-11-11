import { z, ZodType } from 'zod'

export class NoteValidation {
    static readonly CREATE: ZodType = z.object({
        title: z
            .string()
            .min(1, 'Title must not be empty')
            .max(100, 'Title must not be longer than 100 characters'),
        description: z
            .string()
            .min(1, 'Description must not be empty')
    })

    static readonly GET: ZodType = z.number().positive()

    static readonly UPDATE: ZodType = z.object({
        id: z
            .number()
            .positive(),
        title: z
            .string()
            .min(1, 'Title must not be empty')
            .max(100, 'Title must not be longer than 100 characters'),
        description: z
            .string()
            .min(1, 'Description must not be empty')
    })

    static readonly DELETE: ZodType = z.number().positive()

    static readonly SEARCH: ZodType = z.object({
        title: z
            .string()
            .min(1, 'Title must not be empty')
            .max(100, 'Title must not be longer than 100 characters')
            .optional(),
        page: z
            .number()
            .min(1)
            .positive(),
        size: z
            .number()
            .min(1)
            .max(100)
            .positive(),
    })
}
