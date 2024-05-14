'use client'

import {useMemo, useState} from 'react'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import Spinner from '@/components/ui/Spinner'
import classNames from 'classnames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
// import {dateLocales} from '@/locales'
// import dayjs from 'dayjs'
// eslint-disable-next-line import/no-named-as-default
// import i18n from 'i18next'
import {HiCheck} from 'react-icons/hi'
import type {CommonProps} from '@/@types/common'
import useStore from "@/store/useStore";
import { useLocaleStore } from '@/store/slices/locale/localeSlice'

const languageList = [
    { label: 'English', value: 'en', flag: 'us' },
    { label: 'Chinese', value: 'zhCn', flag: 'cn' },
    { label: 'Espanol', value: 'es', flag: 'sp' },
    { label: 'Arabic', value: 'ar', flag: 'ar' },
]

const _LanguageSelector = ({ className }: CommonProps) => {
    const { currentLang,setLang } = useLocaleStore();
    const [loading, setLoading] = useState(false)
    // const locale = useStore((state: any) => state.locale.currentLang)
    // const setLang = useStore((state: any) => state.locale.setLang)
    const selectLangFlag = useMemo(() => {
        return languageList.find((lang) => lang.value === currentLang)?.flag
    }, [currentLang])

    console.log(selectLangFlag)

    const selectedLanguage = (
        <div className={classNames(className, 'flex items-center')}>
            {loading ? (
                <Spinner size={20} />
            ) : (
                <Avatar
                    size={24}
                    shape="circle"
                    src={`/img/countries/${selectLangFlag}.png`}
                />
            )}
        </div>
    )

    const onLanguageSelect = (lang: string) => {
        const formattedLang = lang.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase()
        })

        setLoading(true)

        // const dispatchLang = () => {
            // TODO: Implement Localization
            // i18n.changeLanguage(formattedLang)
            setLang(lang)
        // }
        setLoading(false)

        // TODO: Implement Localization
        // dateLocales[formattedLang]()
        //     .then(() => {
        //         dayjs.locale(formattedLang)
        //         dispatchLang()
        //     })
        //     .catch(() => {
        //         dispatchLang()
        //     })
    }

    return (
        <Dropdown renderTitle={selectedLanguage} placement="bottom-end">
            {languageList.map((lang) => (
                <Dropdown.Item
                    key={lang.label}
                    className="mb-1 justify-between"
                    eventKey={lang.label}
                    onClick={() => onLanguageSelect(lang.value)}
                >
                    <span className="flex items-center">
                        <Avatar
                            size={18}
                            shape="circle"
                            src={`/img/countries/${lang.flag}.png`}
                        />
                        <span className="ltr:ml-2 rtl:mr-2">{lang.label}</span>
                    </span>
                    {currentLang === lang.value && (
                        <HiCheck className="text-emerald-500 text-lg" />
                    )}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

const LanguageSelector = withHeaderItem(_LanguageSelector)

export default LanguageSelector
