interface CardProps {
  children: any
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="flex flex-row items-center bg-zinc-900 p-2 my-4 rounded-md drop-shadow-md shadow-amber-50">
      {children}
    </div>
  )
}

export default Card
