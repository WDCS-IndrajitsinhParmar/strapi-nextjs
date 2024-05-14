import HorizontalMenuContent from './HorizontalMenuContent'
import useResponsive from '@/utils/hooks/useResponsive'
import useStore from "@/store/useStore";

const HorizontalNav = () => {
    const mode = useStore((state: any) => state.theme.mode)
    // TODO: USER AUTHORITY LOGIC NEEDS TO BE IMPLEMENTED
    const userAuthority = useStore((state: any) => state.user.authority)

    const { larger } = useResponsive()

    return (
        <>
            {larger.md && (
                <HorizontalMenuContent
                    manuVariant={mode}
                    userAuthority={userAuthority}
                />
            )}
        </>
    )
}

export default HorizontalNav
