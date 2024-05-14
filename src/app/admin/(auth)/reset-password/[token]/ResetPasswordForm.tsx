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
import { resetPassword } from '@/lib/authentication'

interface ResetPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    resetPasswordUrl?: string
    signUpUrl?: string
}

type ResetPasswordFormSchema = {
    password: string
}

// COMPONENT 
const ResetPasswordForm = (token: any, props: ResetPasswordFormProps) => {
    const { disableSubmit = false, className, signUpUrl = '/admin/login' } = props;
console.log("fbhrthytjfth------------------", token?.token);

    const initialState: any = { message: null, error: null, success: null };
    const resetWithToken = resetPassword.bind(null, token?.token)
    const [state, dispatch] = useFormState(resetWithToken, initialState);
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
                            className={`${(state?.errors?.password) ? "input-invalid" : ""}`}
                        />
                    </FormItem>

                    {/* SUBMIT BUTTON  */}
                    <SubmitButton block={true} variant="solid" type="submit">Reset Password</SubmitButton>
                    <div className="mt-4 text-center">
                        <span>{`Back to`} </span>
                        <Link href={signUpUrl}>Sign in</Link>
                    </div>
                </FormContainer>
            </form>

        </div>
    )
}

export default ResetPasswordForm
