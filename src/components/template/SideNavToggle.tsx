import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useResponsive from '@/utils/hooks/useResponsive'
import NavToggle from '@/components/shared/NavToggle'
import type {CommonProps} from '@/@types/common'
import { useThemeStore } from '@/store/slices/theme/themeSlice'

const _SideNavToggle = ({ className }: CommonProps) => {
    const sideNavCollapse = useThemeStore((state: any) => state.layout.sideNavCollapse
    )
    const setSideNavCollapse = useThemeStore((state: any) => state.setSideNavCollapse
    )

    const { larger } = useResponsive()

    const onCollapse = () => {
        setSideNavCollapse(!sideNavCollapse)
    }

    return (
        <>
            {larger.md && (
                <div className={className} onClick={onCollapse}>
                    <NavToggle className="text-2xl" toggled={sideNavCollapse} />
                </div>
            )}
        </>
    )
}

const SideNavToggle = withHeaderItem(_SideNavToggle)

export default SideNavToggle
