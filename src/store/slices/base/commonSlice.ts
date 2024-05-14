import {create} from 'zustand'
import appConfig from '@/configs/app.config'

type CommonState = {
    currentRouteKey: string
    setCurrentRouteKey: (routekey: string) => void
}

export const baseInitialState = {
    currentRouteKey: '',
}

export const useBaseStore = create<CommonState>((set) => ({
    ...baseInitialState,
    setCurrentRouteKey: (routekey) => set({ currentRouteKey: routekey }),
}))