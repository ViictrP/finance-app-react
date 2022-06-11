import './style.css'

import { Link } from 'react-router-dom'

const NavigationBar = ({ children }: any) => {
  return (
    <div className="w-full fixed flex flex-row items-center justify-around bottom-0 overflow-x-auto bg-zinc-900">
      {children}
    </div>
  )
}

export default NavigationBar

interface NavigationItemProps {
  title?: any
  href?: string
  onClick?: () => void
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
        onClick && onClick()
      }}
      to={href ?? ''}
    >
      {title ?? 'item'}
    </Link>
  )
}