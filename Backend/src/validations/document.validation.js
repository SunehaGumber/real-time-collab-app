import { z } from 'zod';

export const documentSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.any().optional()
    })
})

export const addCollabSchema = z.object({
    body: z.object({
        email: z.string().email(),
        role: z.enum(["viewer", "editor"]).optional()
    }) 
})