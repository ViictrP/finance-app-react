interface ButtonProps {
  title?: string;
  type?: 'button' | 'submit';
  icon?: any;
  disabled?: boolean;
  onClick?: () => void;
  className?: any;
}

const Button = ({ title, type, icon, disabled, onClick, className }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type ?? 'button'}
      onClick={() => onClick && onClick()}
      className={`w-full p-2 rounded-md bg-indigo-500 hover:bg-indigo-900 disabled:hover:bg-indigo-500 disabled:opacity-50 ${className}`}
    >
      {icon ?? ''}
      {title ?? 'Button'}
    </button>
  );
};

export default Button;
