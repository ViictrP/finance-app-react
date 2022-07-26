import { ReactNode, useEffect, useState } from 'react';

interface AlertProps {
  show: boolean;
  children: ReactNode;
}

const Alert = ({ show, children }: AlertProps) => {
  const [__show, setShow] = useState(false);

  useEffect(() => {
    setShow(show);
  }, [show]);

  useEffect(() => {
    document.body.style.overflow = __show ? 'hidden' : '';
  }, [__show]);

  return (
    <div
      className={`${__show ? '' : 'hidden'} fade-in fixed flex flex-col items-center w-full h-full top-0 left-0 overflow-hidden scrollbar-none bg-zinc-900 bg-opacity-90 z-10 transition delay-1s`}>
      <div className="relative shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto border-[0.5px] border-gray-200 dark:border-gray-700">
        <div className="w-full h-full text-center">
          <div className="flex h-full flex-col justify-between">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
