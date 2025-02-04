import Dropdown from '@/components/ui/Dropdown'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import classNames from 'classnames'

export type HorizontalMenuItemProps = {
    nav: {
        key: string
        title: string
        translateKey: string
        icon: string
        path: string
        isExternalLink?: boolean
    }
}

const HorizontalMenuDropdownItem = ({ nav }: HorizontalMenuItemProps) => {
    const { title, translateKey, path, key, isExternalLink } = nav


    const itemTitle = title // t(translateKey, title)

    return (
        <Dropdown.Item 
            eventKey={key} 
            className={
                classNames(
                    path && 'px-0'
                )
            }
        >
            {path ? (
                <HorizontalMenuNavLink 
                    path={path}
                    className={
                        classNames(
                            path && 'px-2'
                        )
                    }
                    isExternalLink={isExternalLink}
                >
                    {itemTitle}
                </HorizontalMenuNavLink>
            ) : (
                <span>{itemTitle}</span>
            )}
        </Dropdown.Item>
    )
}

export default HorizontalMenuDropdownItem
