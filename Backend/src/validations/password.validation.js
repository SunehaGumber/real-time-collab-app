import { z } from 'zod';

export const updatePassSchema = z.object({
    body: z.object({
        email: z.string().email(),
        oldPassword: z.string().min(6),
        newPassword: z.string().min(6) 
    })
});

export const changePassSchema = z.object({
    body: z.object({
        newPassword:z.string().min(6),
        confirmPassword:z.string().min(6)
    })
})