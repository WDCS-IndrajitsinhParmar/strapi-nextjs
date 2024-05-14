import SidePanel from '@/components/template/SidePanel'
import {HiOutlineCog} from 'react-icons/hi'
import classNames from 'classnames'
import useStore from "@/store/useStore";

const ConfiguratorToggle = () => {
    const themeColor =  useStore((state: any) => state.theme.themeColor)
    const setPanelExpand =  useStore((state: any) => state.theme.setPanelExpand)

    const primaryColorLevel = useStore(
        (state: any) => state.theme.primaryColorLevel
    )

    return (
        <div
            className={classNames(
                'fixed ltr:right-0 rtl:left-0 top-96 p-3 ltr:rounded-tl-md ltr:rounded-bl-md rtl:rounded-tr-md rtl:rounded-br-md text-white text-xl cursor-pointer select-none',
                `bg-${themeColor}-${primaryColorLevel}`
            )}
            onClick={() => {
                setPanelExpand(true)
            }}
        >
            <HiOutlineCog />
        </div>
    )
}

const BlankLayout = ({children}: any) => {
    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            {children}
            <ConfiguratorToggle />
            {/* <SidePanel className="hidden" /> */}
        </div>
    )
}

export default BlankLayout
