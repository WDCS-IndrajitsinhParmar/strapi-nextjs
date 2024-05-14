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
import React, { useEffect, useState } from 'react'
import { forgotPassword } from '@/lib/authentication'

interface ForgotPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

type ForgotPasswordFormSchema = {
    email: string
}

// COMPONENT 
const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const { disableSubmit = false, className, signUpUrl = '/admin/login' } = props

    const initialState: any = { message: null, error: null, success: null };
    const [state, dispatch] = useFormState(forgotPassword, initialState);
    const [message, setMessage] = useTimeOutMessage();    

    if (state?.error?.length>1) {
        setMessage(`${state.error}`);
        state.error="";
    } else if (state?.message?.length>1) {
        setMessage(`${state.message}`);
        state.message="";
    }
    
    return (
        <div className={className}>
            {/* ALERT ERROR MESSAGE  */}
            {message && (
                <Alert showIcon className="mb-4" type={state.success==true ? "success" : "danger"}>
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
                            className={`${(state?.errors?.email) ? "input-invalid" : ""}`}
                        />
                    </FormItem>

                    {/* SUBMIT BUTTON  */}
                    <SubmitButton block={true} variant="solid" type="submit">Send Email</SubmitButton>
                    <div className="mt-4 text-center">
                        <span>{`Back to`} </span>
                        <Link href={signUpUrl}>Sign in</Link>
                    </div>
                </FormContainer>
            </form>

        </div>
    )
}

export default ForgotPasswordForm
