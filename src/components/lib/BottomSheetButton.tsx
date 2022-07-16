import { CaretRight, Money, Wallet, X, XCircle } from 'phosphor-react';
import { ReactNode, useEffect, useState } from 'react';
import { Button, Input } from './index';

interface BottomSheetButtonProps {
  idKey: string;
  title: string;
  placeholder: string;
  buttonTitle: string;
  children: ReactNode;
}

const BottomSheetButton = ({ idKey, title, buttonTitle, children }: BottomSheetButtonProps) => {

  useEffect(() => console.log(idKey), [idKey]);

  return (
    <>
      <button
        className="flex flex-row items-center py-4 px-3 text-2xl justify-between w-full border-t-[0.5px] border-zinc-800"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasBottom-${idKey}`}
        aria-controls={`offcanvasBottom-${idKey}`}>
        <div className="flex flex-row items-center gap-4">
          <Wallet size={28} />
          {buttonTitle}
        </div>
        <CaretRight size={14} />
      </button>

      <div
        id={`offcanvasBottom-${idKey}`}
        className="offcanvas offcanvas-bottom fixed bottom-0 flex flex-col max-w-full bg-white dark:bg-zinc-900 invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out dark:text-white left-0 right-0 border-[0.5px] dark:border-zinc-700 rounded-md h-1/2 max-h-full mx-[1px]"
        tabIndex={-1}
        aria-labelledby={`offcanvasBottomLabel-${idKey}`}>
        <div className="offcanvas-header flex items-center justify-between p-4">
          <h5 className="offcanvas-title mb-0 leading-normal font-semibold"
              id={`offcanvasBottomLabel-${idKey}`}>{title}</h5>
          <button type="button"
                  className="box-content w-4 h-4 p-2 -my-5 -mr-2 dark:text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close">
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="offcanvas-body flex-grow p-4 overflow-y-auto small">
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheetButton;
