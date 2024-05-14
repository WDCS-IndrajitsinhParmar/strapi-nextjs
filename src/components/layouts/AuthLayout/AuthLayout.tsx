'use client'

import Side from './Side'
// import Cover from './Cover'
// import Simple from './Simple'
import {LAYOUT_TYPE_BLANK} from '@/constants/theme.constant'
import useStore from "@/store/useStore";
import {LayoutType} from "@/@types/theme";

const AuthLayout = ({children}: any) => {
    const layoutType: LayoutType = useStore((state: any) => state.theme.layout.type)

    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            {layoutType === LAYOUT_TYPE_BLANK ? (
                <>
                    {children}
                </>
            ) : (
                <Side>
                    {children}
                </Side>
            )}
        </div>
    )
}

export default AuthLayout
