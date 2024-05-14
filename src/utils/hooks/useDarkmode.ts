'use client'

import {useEffect} from 'react'
import {THEME_ENUM} from '@/constants/theme.constant'
import type {Mode} from '@/@types/theme'
import useStore from "@/store/useStore";

function useDarkMode(): [
    isEnabled: boolean,
    onModeChange: (mode: Mode) => void
] {
    const {mode, setMode} = useStore((state: any) => state.theme)
    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

    const isEnabled = mode === MODE_DARK

    const onModeChange = (mode: Mode) => {
        (setMode(mode))
    }

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK)
        root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled])

    return [isEnabled, onModeChange]
}

export default useDarkMode
