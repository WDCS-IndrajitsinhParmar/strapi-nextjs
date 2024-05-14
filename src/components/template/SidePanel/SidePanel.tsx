import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import {HiOutlineCog} from 'react-icons/hi'
import SidePanelContent, {SidePanelContentProps} from './SidePanelContent'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import type {CommonProps} from '@/@types/common'
import useStore from "@/store/useStore";

type SidePanelProps = SidePanelContentProps & CommonProps

const _SidePanel = (props: SidePanelProps) => {
    const { className, ...rest } = props

    const panelExpand = useStore((state: any) => state.theme.panelExpand)
    const setPanelExpand = useStore((state: any) => state.theme.setPanelExpand)

    const direction = useStore((state: any) => state.theme.direction)

    const openPanel = () => {
        setPanelExpand(true)
    }

    const closePanel = () => {
        setPanelExpand(false)
        const bodyClassList = document.body.classList
        if (bodyClassList.contains('drawer-lock-scroll')) {
            bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
        }
    }

    return (
        <>
            <div
                className={classNames('text-2xl', className)}
                onClick={openPanel}
                {...rest}
            >
                <HiOutlineCog />
            </div>
            <Drawer
                title="Theme Config"
                isOpen={panelExpand}
                placement={direction === 'rtl' ? 'left' : 'right'}
                width={375}
                onClose={closePanel}
                onRequestClose={closePanel}
            >
                <SidePanelContent callBackClose={closePanel} />
            </Drawer>
        </>
    )
}

const SidePanel = withHeaderItem(_SidePanel)

export default SidePanel
