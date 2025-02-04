'use server'

import { z } from 'zod'

const schema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
    }),
})

export default async function signInAction(prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Mutate data
}
