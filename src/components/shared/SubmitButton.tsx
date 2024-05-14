"use client"
import Button from '@/components/ui/Button'
import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({ children, ...rest }: { children: any, rest: any }) => {    
    const { pending } = useFormStatus();

  return (
    <Button type="submit" {...rest} disabled={pending}>{ pending ? "Loading..." : children }</Button>
  )
}

export default SubmitButton