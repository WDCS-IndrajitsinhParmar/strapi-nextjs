import Logo from '@/components/template/Logo'
import useStore from "@/store/useStore";

const HeaderLogo = () => {
    const mode = useStore((state: any) => state.theme.mode)

    return <Logo mode={mode} className="hidden md:block" />
}

export default HeaderLogo
