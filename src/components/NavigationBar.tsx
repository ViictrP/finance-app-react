import { Link } from 'react-router-dom'

const NavigationBar = ({ children }: any) => {
  return (
    <div className="w-full fixed z-10 flex flex-row items-center justify-evenly bottom-0 overflow-x-auto bg-zinc-900 drop-shadow-md shadow-amber-50">
      {children}
    </div>
  )
}

export default NavigationBar

interface NavigationItemProps {
  title?: any
  href?: string
  onClick?: (path: any) => void
}

export const NavigationItem = ({
                                 href,
                                 title,
                                 onClick,
                               }: NavigationItemProps) => {
  return (
    <Link
      className="p-3"
      onClick={() => {
        onClick && onClick(href)
      }}
      to={href ?? ''}
    >
      {title ?? 'item'}
    </Link>
  )
}
