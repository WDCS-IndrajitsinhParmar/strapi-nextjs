import { create } from 'zustand'
import { themeConfig } from '@/configs/theme.config'
import {
    LAYOUT_TYPE_MODERN,
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_STACKED_SIDE,
    NAV_MODE_TRANSPARENT,
    NAV_MODE_LIGHT,
    NAV_MODE_DARK,
    NAV_MODE_THEMED,
    MODE_DARK,
    MODE_LIGHT,
    LAYOUT_TYPE_DECKED,
} from '@/constants/theme.constant'
import type {
    LayoutType,
    Mode,
    NavMode,
    ColorLevel,
    Direction,
} from '@/@types/theme'

const initialNavMode = () => {
    if (
        themeConfig.layout.type === LAYOUT_TYPE_MODERN &&
        themeConfig.navMode !== NAV_MODE_THEMED
    ) {
        return NAV_MODE_TRANSPARENT
    }

    return themeConfig.navMode
}

const availableNavColorLayouts = [
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_STACKED_SIDE,
    LAYOUT_TYPE_DECKED,
]

type ThemeState = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType
    }
    setDirection: (direction: Direction) => void
    setMode: (mode: Mode) => void
    setLayout: (layout: LayoutType) => void
    setPreviousLayout: (previousType: LayoutType) => void
    setSideNavCollapse: (sideNavCollapse: boolean) => void
    setNavMode: (navMode: NavMode | 'default') => void
    setPanelExpand: (panelExpand: boolean) => void
    setThemeColor: (themeColor: string) => void
    setThemeColorLevel: (primaryColorLevel: ColorLevel) => void
}

export const themeInitialState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    panelExpand: themeConfig.panelExpand,
    cardBordered: themeConfig.cardBordered,
    navMode: initialNavMode(),
    layout: themeConfig.layout,
}

export const useThemeStore = create<ThemeState>((set) => ({
    ...themeInitialState,
    setDirection: (direction) => set({ direction }),
    setMode: (mode) =>
        set((state) => {
            const availableColorNav = availableNavColorLayouts.includes(
                state.layout.type,
            )
            let navMode = state.navMode
            if (
                availableColorNav &&
                mode === MODE_DARK &&
                navMode !== NAV_MODE_THEMED
            ) {
                navMode = NAV_MODE_DARK
            }
            if (
                availableColorNav &&
                mode === MODE_LIGHT &&
                navMode !== NAV_MODE_THEMED
            ) {
                navMode = NAV_MODE_LIGHT
            }
            return { mode, navMode }
        }),
    setLayout: (type) =>
        set((state) => {
            const cardBordered = type === LAYOUT_TYPE_MODERN
            let navMode = state.navMode
            if (type === LAYOUT_TYPE_MODERN) {
                navMode = NAV_MODE_TRANSPARENT
            }
            const availableColorNav = availableNavColorLayouts.includes(type)
            if (availableColorNav && state.mode === MODE_LIGHT) {
                navMode = NAV_MODE_LIGHT
            }
            if (availableColorNav && state.mode === MODE_DARK) {
                navMode = NAV_MODE_DARK
            }
            return { layout: { ...state.layout, type }, cardBordered, navMode }
        }),
    setPreviousLayout: (previousType) =>
        set((state) => ({ layout: { ...state.layout, previousType } })),
    setSideNavCollapse: (sideNavCollapse) => {
        set((state) => ({ layout: { ...state.layout, sideNavCollapse } }))
    },
    setNavMode: (navMode) =>
        set((state) => {
            if (navMode !== 'default') {
                return { navMode }
            } else {
                let navMode = state.navMode
                if (state.layout.type === LAYOUT_TYPE_MODERN) {
                    navMode = NAV_MODE_TRANSPARENT
                }
                const availableColorNav = availableNavColorLayouts.includes(
                    state.layout.type,
                )
                if (availableColorNav && state.mode === MODE_LIGHT) {
                    navMode = NAV_MODE_LIGHT
                }
                if (availableColorNav && state.mode === MODE_DARK) {
                    navMode = NAV_MODE_DARK
                }
                return { navMode }
            }
        }),
    setPanelExpand: (panelExpand) => set({ panelExpand }),
    setThemeColor: (themeColor) => set({ themeColor }),
    setThemeColorLevel: (primaryColorLevel) => set({ primaryColorLevel }),
}))
