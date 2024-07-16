import zod from 'zod'

// zod schemas for backend, types for frontend

const signupSchema = zod.object({
    email: zod.string().email(),
    name: zod.string().optional(),
    password: zod.string().min(6)
})

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

const createBlogSchema = zod.object({
    title: zod.string(),
    content: zod.string()
})

const updateBlogSchema = zod.object({
    id: zod.string(),
    title: zod.string(),
    content: zod.string(),
    published: zod.boolean().optional()
})

export type SignupSchema = zod.infer<typeof signupSchema>
export type SigninSchema = zod.infer<typeof signinSchema>
export type CreateBlogSchema = zod.infer<typeof createBlogSchema>
export type UpdateBlogSchema = zod.infer<typeof updateBlogSchema>