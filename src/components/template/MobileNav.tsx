'use client'

import { useState, Suspense, lazy } from 'react'
import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import {
    NAV_MODE_THEMED,
    NAV_MODE_TRANSPARENT,
    DIR_RTL,
} from '@/constants/theme.constant'
import withHeaderItem, { WithHeaderItemProps } from '@/utils/hoc/withHeaderItem'
import NavToggle from '@/components/shared/NavToggle'
// import navigationConfig from '@/configs/navigation.config'
import useResponsive from '@/utils/hooks/useResponsive'
import useStore from "@/store/useStore";
import { useMenusStore } from '@/store/slices/menus/menuSlice'

const VerticalMenuContent = lazy(
    () => import('@/components/template/VerticalMenuContent')
)

type MobileNavToggleProps = {
    toggled?: boolean
}

const MobileNavToggle = withHeaderItem<
    MobileNavToggleProps & WithHeaderItemProps
>(NavToggle)

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const themeColor = useStore((state: any) => state.theme.themeColor)
    const primaryColorLevel = useStore(
        (state: any) => state.theme.primaryColorLevel
    )
    const navMode = useStore((state: any) => state.theme.navMode)
    const mode = useStore((state: any) => state.theme.mode)
    const direction = useStore((state: any) => state.theme.direction)
    const currentRouteKey = useStore(
        (state: any) => state.base.currentRouteKey
    )
    const sideNavCollapse = useStore(
        (state: any) => state.theme.layout.sideNavCollapse
    )
    const userAuthority = useStore((state: any) => state.user.authority)

    const { smaller } = useResponsive()

    const navColor = () => {
        if (navMode === NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
        }

        if (navMode === NAV_MODE_TRANSPARENT) {
            return `side-nav-${mode}`
        }

        return `side-nav-${navMode}`
    }

    const navigationConfig = useMenusStore((state: any) => state.menus);
    console.log(navigationConfig, "jdfksdkfjsafjsdfsdjk");

    return (
        <>
            {smaller.md && (
                <>
                    <div className="text-2xl" onClick={openDrawer}>
                        <MobileNavToggle toggled={isOpen} />
                    </div>
                    <Drawer
                        title="Navigation"
                        isOpen={isOpen}
                        bodyClass={classNames(navColor(), 'p-0')}
                        width={330}
                        placement={direction === DIR_RTL ? 'right' : 'left'}
                        onClose={onDrawerClose}
                        onRequestClose={onDrawerClose}
                    >
                        <Suspense fallback={<></>}>
                            {isOpen && (
                                <VerticalMenuContent
                                    navMode={navMode}
                                    collapsed={sideNavCollapse}
                                    navigationTree={navigationConfig}
                                    routeKey={currentRouteKey}
                                    userAuthority={userAuthority as string[]}
                                    direction={direction}
                                    onMenuItemClick={onDrawerClose}
                                />
                            )}
                        </Suspense>
                    </Drawer>
                </>
            )}
        </>
    )
}

export default MobileNav
