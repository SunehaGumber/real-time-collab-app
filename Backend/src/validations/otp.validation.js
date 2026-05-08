import { z } from 'zod';

export const emailSchema = z.object({
    body: z.object({
        email: z.string().email(),
    })
});

export const verifyOTPSchema = z.object({
    body: z.object({
        email: z.string().email(),
        otp:z.string() 
    })
})