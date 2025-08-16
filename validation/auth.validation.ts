import { z } from "zod";


export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const baseSignupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than or equal to 50 characters"),
  
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than or equal to 50 characters"),
  
  confirmPassword: z.string(),
  
  role: z.enum(["patient", "doctor"]).default("patient")
})

export const signupSchema = baseSignupSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
)

export const signupPayloadSchema = baseSignupSchema.omit({ confirmPassword: true })

export type SignupForm = z.infer<typeof signupSchema>
export type SignupPayload = z.infer<typeof signupPayloadSchema>
