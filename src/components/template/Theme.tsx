'use client'

import ConfigProvider from '@/components/ui/ConfigProvider'
import useDarkMode from '@/utils/hooks/useDarkmode'
import type { CommonProps } from '@/@types/common'
import { themeConfig } from '@/configs/theme.config'
import useStore from "@/store/useStore";

const Theme = (props: CommonProps) => {
    const theme = useStore((state:any) => state.theme)
    const locale = useStore((state: any) => state.locale.currentLang)
    useDarkMode()

    const currentTheme = {
        ...themeConfig,
        ...theme,
        ...{ locale },
    }

    return (
        <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>
    )
}

export default Theme
