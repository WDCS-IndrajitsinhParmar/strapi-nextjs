'use client'

import {useEffect} from 'react'
import type {Direction} from '@/@types/theme'
import useStore from "@/store/useStore";

function useDirection(): [
    direction: Direction,
    updateDirection: (dir: Direction) => void
] {
    const direction = useStore((state: any) => state.theme.direction)
    const setDirection = useStore((state: any) => state.theme.setDirection)

    const updateDirection = (dir: Direction) => {
        setDirection(dir)
    }

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.setAttribute('dir', direction)
    }, [direction])

    return [direction, updateDirection]
}

export default useDirection
