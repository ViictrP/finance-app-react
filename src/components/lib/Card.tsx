interface CardProps {
  children: any
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="gap-4 flex flex-row items-center bg-white dark:bg-zinc-900 p-2 my-4 rounded-md drop-shadow border-[0.5px] border-zinc-200 dark:border-zinc-700">
      {children}
    </div>
  )
}

export default Card
