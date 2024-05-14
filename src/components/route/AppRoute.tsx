import { useEffect, useCallback } from 'react'
import type { LayoutType } from '@/@types/theme'
import type { ComponentType } from 'react'
import useStore from "@/store/useStore";

export type AppRouteProps<T> = {
    component: ComponentType<T>
    routeKey: string
    layout?: LayoutType
}

const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    ...props
}: AppRouteProps<T>) => {
    const layoutType = useStore((state: any) => state.theme.layout.type)
    const previousLayout = useStore(
        (state: any) => state.theme.layout.previousType
    )
    const setLayout = useStore((state: any) => state.theme.setLayout)
    const setPreviousLayout = useStore((state: any) => state.theme.setPreviousLayout)

    const handleLayoutChange = useCallback(() => {

        if (props.layout && props.layout !== layoutType) {
            (setPreviousLayout(layoutType))
            (setLayout(props.layout))
        }

        if (!props.layout && previousLayout && layoutType !== previousLayout) {
            (setLayout(previousLayout))
            (setPreviousLayout(''))
        }
    }, [ layoutType, previousLayout, props.layout, routeKey])

    useEffect(() => {
        handleLayoutChange()
    }, [handleLayoutChange])

    return <Component {...(props as T)} />
}

export default AppRoute
