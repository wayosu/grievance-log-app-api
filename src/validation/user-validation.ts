import { z, ZodType } from 'zod'

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z
            .string()
            .min(3, 'Username must be at least 3 characters')
            .max(100, 'Username must be at most 100 characters'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password must be at most 100 characters'),
        name: z
            .string()
            .min(3, 'Name must be at least 3 characters')
            .max(100, 'Name must be at most 100 characters')
    })

    static readonly LOGIN: ZodType = z.object({
        username: z
            .string()
            .min(3, 'Username must be at least 3 characters')
            .max(100, 'Username must be at most 100 characters'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password must be at most 100 characters')
    })

    static readonly TOKEN: ZodType = z.string().min(1)

    static readonly UPDATE: ZodType = z.object({
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password must be at most 100 characters')
            .optional(),
        name: z
            .string()
            .min(3, 'Name must be at least 3 characters')
            .max(100, 'Name must be at most 100 characters')
            .optional()
    })
}
