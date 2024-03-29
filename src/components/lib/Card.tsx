interface CardProps {
  children: any;
  onClick?: () => void;
}

const Card = ({ children, onClick }: CardProps) => {
  return (
    <div
      onClick={() => {
        onClick && onClick();
      }}
      className="gap-4 flex flex-row items-center bg-white dark:bg-zinc-900 p-2 my-4 rounded-md drop-shadow border-[0.5px] border-zinc-200 dark:border-zinc-700">
      {children}
    </div>
  );
};

export default Card;
