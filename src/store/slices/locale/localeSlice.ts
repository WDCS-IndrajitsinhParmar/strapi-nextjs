import {create} from 'zustand'
import appConfig from '@/configs/app.config'

type LocaleState = {
    currentLang: string
    setLang: (lang: string) => void
}

export const localeInitialState = {
    currentLang: appConfig.locale,
}

export const useLocaleStore = create<LocaleState>((set) => ({
    ...localeInitialState,
    setLang: (lang) => set({ currentLang: lang }),
}))
