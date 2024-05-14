"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

// signin code
export const authenticate = async (prevState: any, formData: FormData) => {    
    // product zod schema validation
    const userSchema = z.object({
        email: z.string().email('Invalid email address'),
        password: z.string(),
    });

    // validating data using zod schema
    const validateFields = userSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })

    // check if errors
    if (!validateFields.success) {
        return {
          errors: validateFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Signin.',
          custom: validateFields.error.flatten(),
        };
    }

    console.log("Signin data = ", validateFields.data);
    try {
        await signIn("credentials", validateFields.data);
    } catch (error: any) {                    
        if (error instanceof AuthError) {
            switch (error.type) {
              case 'CredentialsSignin':
                return {
                    error: "Invalid credentials.",
                    success: false,
                }
              default:
                return {
                    error: "Something went wrong while validating user.",
                    success: false,
                }
            }
        }
        // return {
        //     error: `Internal Server Error (${error.message})`,
        //     success: false,
        // }
        throw error;
    }
}

// signout code
export const userLogout = async () => {
    await signOut();
}

// forgot password code
export const forgotPassword = async (prevState: any, formData: FormData) => {
    // product zod schema validation
    const userSchema = z.object({
        email: z.string().email('Invalid email address'),
    });

    // validating data using zod schema
    const validateFields = userSchema.safeParse({
        email: formData.get("email"),
    })

    // check if errors
    if (!validateFields.success) {
        return {
          errors: validateFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Signin.',
          custom: validateFields.error.flatten(),
        };
    }

    console.log("Forgot Password data = ", validateFields.data);
    try {
        // API CODE 
        let data: any = await fetch(`${process.env.STRAPI_APP_URL}/admin/forgot-password`, {
            method:"POST",
            body: JSON.stringify({ email: validateFields.data.email }),
            headers : {
                "Content-Type": `application/json`,
            },
        });        
        // ERROR HANDLING 
        if (data.error) {
            return {
                error: `${data?.error?.details?.errors == undefined ? data?.error?.message : data?.error?.details?.errors[0]?.message}`,
                success: false,
            }
        }
        // SUCCESS MSG HANDLING 
        if (data.status == 204) {
            return {
                message: "Mail sent successfully",
                success: true,
            }
        }
    } catch (error: any) {                    
        return {
            error: `Internal Server Error (${error.message})`,
            success: false,
        }
        // throw error;
    }
}

// reset password code 
export const resetPassword = async (token: any, prevState: any, formData: FormData) => {
    // product zod schema validation
    const userSchema = z.object({
        password: z.string().min(8, 'Password must be at least 8 characters long').regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
            'Password must contain at least 1 lowercase, 1 uppercase, 1 special character, and 1 number'
        ),
    });

    // validating data using zod schema
    const validateFields = userSchema.safeParse({
        password: formData.get("password"),
    })

    // check if errors
    if (!validateFields.success) {
        return {
          errors: validateFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Signin.',
          custom: validateFields.error.flatten(),
        };
    }

    console.log("Reset Password data = ", validateFields.data, token);
    try {
        // API CODE 
        let data: any = await fetch(`${process.env.STRAPI_APP_URL}/admin/reset-password`, {
            method:"POST",
            body: JSON.stringify({ password: validateFields.data.password, resetPasswordToken: token }),
            headers : {
                "Content-Type": `application/json`,
            },
        });        
        // ERROR HANDLING 
        if (data.error) {
            return {
                error: `${data?.error?.details?.errors == undefined ? data?.error?.message : data?.error?.details?.errors[0]?.message}`,
                success: false,
            }
        }
        // SUCCESS MSG HANDLING         
        data = await data.json();
        if (data.data.token) {
            return {
                message: "Password updated successfully",
                success: true,
            }
        }
    } catch (error: any) {                    
        return {
            error: `Internal Server Error (${error.message})`,
            success: false,
        }
        // throw error;
    }
}