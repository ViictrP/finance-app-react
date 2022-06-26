import { XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';

interface SnackbarProps {
  message: string;
  show: boolean;
  showClose?: boolean;
  autoClose?: boolean;
}

const Snackbar = ({ message, show, showClose, autoClose }: SnackbarProps) => {
  const [isShowing, setIsShowing] = useState(show);

  useEffect(() => {
    setIsShowing(show);
    if (autoClose) {
      const timeout = setTimeout(() => setIsShowing(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!isShowing) {
    return <div></div>;
  }

  return (
    <div
      className="flex flex-row h-11 justify-between absolute top-4 left-4 right-4 bg-zinc-900 p-3 rounded-md shadow-amber-50 border-l-8 border-red-600">
      <span>{message}</span>
      <button>
        {showClose && <XCircle size={20} weight="fill" onClick={() => setIsShowing(false)} />}
      </button>
    </div>
  );
};

export default Snackbar;
