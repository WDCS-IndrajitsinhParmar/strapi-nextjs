"use client"
import classNames from 'classnames'
import ScrollBar from '@/components/ui/ScrollBar'
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    NAV_MODE_DARK,
    NAV_MODE_THEMED,
    NAV_MODE_TRANSPARENT,
    SIDE_NAV_CONTENT_GUTTER,
    LOGO_X_GUTTER,
} from '@/constants/theme.constant'
import Logo from '@/components/template/Logo'
import navigationConfig from '@/configs/navigation.config'
import VerticalMenuContent from '@/components/template/VerticalMenuContent'
import useResponsive from '@/utils/hooks/useResponsive'
import useStore from "@/store/useStore";
import { useMenusStore } from '@/store/slices/menus/menuSlice'
import { useThemeStore } from '@/store/slices/theme/themeSlice'

const sideNavStyle = {
    width: SIDE_NAV_WIDTH,
    minWidth: SIDE_NAV_WIDTH,
}

const sideNavCollapseStyle = {
    width: SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: SIDE_NAV_COLLAPSED_WIDTH,
}

const SideNav = () => {
    const themeColor = useStore((state: any) => state.theme.themeColor)
    const primaryColorLevel = useStore(
        (state: any) => state.theme.primaryColorLevel
    )
    const navMode = useStore((state: any)=> state.theme.navMode)
    const mode =useStore((state: any) => state.theme.mode)
    const direction = useStore((state: any) => state.theme.direction)
    const currentRouteKey = useStore((state: any) => state.base.currentRouteKey
    )
    const sideNavCollapse = useThemeStore((state: any) => state.layout.sideNavCollapse
    )   

    // TODO: IMPLEMENT AUTHENTICATION
    const userAuthority = useStore((state: any) => state.user.authority)

    const { larger } = useResponsive()

    const sideNavColor = () => {
        if (navMode === NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
        }
        return `side-nav-${navMode}`
    }

    const logoMode = () => {
        if (navMode === NAV_MODE_THEMED) {
            return NAV_MODE_DARK
        }

        if (navMode === NAV_MODE_TRANSPARENT) {
            return mode
        }

        return navMode
    }

    const navigationConfig = useMenusStore((state: any) => state.menus);

    const menuContent = (
        <VerticalMenuContent
            navMode={navMode}
            collapsed={sideNavCollapse}
            navigationTree={navigationConfig}
            routeKey={currentRouteKey}
            userAuthority={userAuthority as string[]}
            direction={direction}
        />
    )

    return (
        <>
            {larger.md && (
                <div
                    style={
                        sideNavCollapse ? sideNavCollapseStyle : sideNavStyle
                    }
                    className={classNames(
                        'side-nav',
                        sideNavColor(),
                        !sideNavCollapse && 'side-nav-expand'
                    )}
                >
                    <div className="side-nav-header">
                        <Logo
                            mode={logoMode()}
                            type={sideNavCollapse ? 'streamline' : 'full'}
                            className={
                                sideNavCollapse
                                    ? SIDE_NAV_CONTENT_GUTTER
                                    : LOGO_X_GUTTER
                            }
                        />
                    </div>
                    {sideNavCollapse ? (
                        menuContent
                    ) : (
                        <div className="side-nav-content">
                            <ScrollBar autoHide direction={direction}>
                                {menuContent}
                            </ScrollBar>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default SideNav
