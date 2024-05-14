"use client";
import React, { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react"
import { useMenusStore } from '@/store/slices/menus/menuSlice';

const UseClientSessionProviders = ({ children,menusData }: { children: ReactNode,menusData:any }) => {

  const setMenusData = useMenusStore((state: any) => state.setMenus);
  setMenusData(menusData);

  return (
    <SessionProvider>{children}</SessionProvider> 
  )
}

export default UseClientSessionProviders