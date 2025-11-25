import { z } from 'zod';

export const emailSchema = z.string().email({ message: "Invalid email address" });
export const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" });
export const requiredStringSchema = z.string().min(1, { message: "This field is required" });

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const signUpSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
