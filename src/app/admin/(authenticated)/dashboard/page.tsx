import { auth } from '@/auth';
import { userLogout } from '@/lib/authentication'
import React from 'react'
import ClientComponentSessionUse from './ClientComponentSessionUse';
import SubmitButton from '@/components/shared/SubmitButton';

const Dashboard = async () => {
  console.log("SESSION AUTH = ", await auth());
  
  return (
    <>
      <h1>DASHBOARD</h1>
      <ClientComponentSessionUse />
      <form action={userLogout}>
        <SubmitButton block={true} variant="solid" type="submit">LOGOUT</SubmitButton>
      </form>
    </>
  )
}

export default Dashboard