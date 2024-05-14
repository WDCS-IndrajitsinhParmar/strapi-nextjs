import Radio from '@/components/ui/Radio'
import { NAV_MODE_THEMED } from '@/constants/theme.constant'
import useStore from "@/store/useStore";

type NavModeParam = 'default' | 'themed'

const NavModeSwitcher = () => {
    const navMode = useStore((state: any) => state.theme.navMode)
    const setNavMode = useStore((state: any) => state.theme.setNavMode)

    const onSetNavMode = (val: NavModeParam) => {
        setNavMode(val)
    }

    return (
        <Radio.Group
            value={navMode === NAV_MODE_THEMED ? NAV_MODE_THEMED : 'default'}
            onChange={onSetNavMode}
        >
            <Radio value="default">Default</Radio>
            <Radio value={NAV_MODE_THEMED}>Themed</Radio>
        </Radio.Group>
    )
}

export default NavModeSwitcher
