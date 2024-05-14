'use client'

import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import {FormContainer, FormItem} from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import type {CommonProps} from '@/@types/common'
import Link from "next/link";
import { useFormState } from 'react-dom'
import SubmitButton from '@/components/shared/SubmitButton'
import { authenticate } from '@/lib/authentication'
import React, { useEffect, useState } from 'react'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

type SignInFormSchema = {
    email: string
    password: string
    rememberMe: boolean
}

// COMPONENT 
const SignInForm = (props: SignInFormProps) => {
    const { disableSubmit = false, className, forgotPasswordUrl = '/admin/forgot-password', signUpUrl = '/admin/reset-password' } = props

    const initialState: any = { message: null, error: null, success: null };
    const [state, dispatch] = useFormState(authenticate, initialState);
    const [message, setMessage] = useTimeOutMessage()    

    if (state?.error?.length>1) {
        setMessage(`${state.error}`);
        state.error="";
    }    
    
    return (
        <div className={className}>
            {/* ALERT ERROR MESSAGE  */}
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <>{message}</>
                </Alert>
            )}

            {/* FORM HANDLING  */}
            <form action={dispatch}>
                <FormContainer>
                    <FormItem
                        label="Email"
                        invalid={(state?.errors?.email) ? true : false}
                        errorMessage={state?.errors?.email &&
                            state.errors.email.map((error: string, index: number) => (
                                <span key={index}>{error}</span>
                        ))}
                    >
                        <Input
                            type="email"
                            autoComplete="off"
                            name="email"
                            placeholder="Email"
                            defaultValue={"irshadali.kadiwala@codezeros.com"}
                            className={`${(state?.errors?.email) ? "input-invalid" : ""}`}
                        />
                    </FormItem>
                    <FormItem
                        label="Password"
                        invalid={(state?.errors?.password) ? true : false}
                        errorMessage={state?.errors?.password &&
                            state.errors.password.map((error: string, index: number) => (
                                <span key={index}>{error}</span>
                        ))}
                    >
                        <Input
                            type="password"
                            autoComplete="off"
                            name="password"
                            placeholder="Password"
                            defaultValue={"webclues@strapiV4"}
                            className={`${(state?.errors?.password) ? "input-invalid" : ""}`}
                        />
                    </FormItem>

                    {/* SUBMIT BUTTON  */}
                    <div className="flex justify-between mb-6">
                        <Checkbox
                            className="mb-0"
                            name="rememberMe"
                        >
                            Remember Me
                        </Checkbox>
                        <ActionLink href={forgotPasswordUrl}>
                            Forgot Password?
                        </ActionLink>
                    </div>
                    <SubmitButton block={true} variant="solid" type="submit">Sign in</SubmitButton>
                    {/* <div className="mt-4 text-center">
                        <span>{`Wanna reset your password?`} </span>
                        <Link href={signUpUrl}>Reset</Link>
                    </div> */}
                </FormContainer>
            </form>

        </div>
    )
}

export default SignInForm
