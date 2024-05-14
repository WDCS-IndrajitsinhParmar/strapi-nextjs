import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import { themeInitialState, useThemeStore } from './slices/theme/themeSlice'
import { localeInitialState, useLocaleStore } from './slices/locale/localeSlice'
import { baseInitialState } from './slices/base/commonSlice'
import { initialSessionState, initialUserState } from './slices/auth/sessionSlice'

const PERSIST_STORE_NAME = 'my-app-store'

const useStore = create(
    persist(
        (set) => ({
            theme: themeInitialState,
            locale: localeInitialState,
            base: baseInitialState,
            session:initialSessionState,
            user:initialUserState, 
            setTheme: (fn: any) => set((state: any) => ({ theme: fn(state.theme) })),
            setLocale: (fn: any) => set((state: any) => ({ locale: fn(state.locale) })),
            setBase: (fn: any) => set((state: any) => ({ base: fn(state.base) })),
            setSession: (fn: any) => set((state: any) => ({ session: fn(state.session) })),
            setUser: (fn: any) => set((state: any) => ({ user: fn(state.user) })),
        }), 
        {
            name: PERSIST_STORE_NAME,
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useStore