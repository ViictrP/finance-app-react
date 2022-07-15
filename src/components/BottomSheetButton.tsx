import { CaretRight, Money, Wallet, X, XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Button, Input } from './lib';

interface BottomSheetButtonProps {
  show: boolean;
  title: string;
  buttonTitle: string;
  placeholder: string;
  onClose: (value: any) => void;
}

const BottomSheetButton = ({ show, title, placeholder, buttonTitle, onClose }: BottomSheetButtonProps) => {
  const [value, setValue] = useState<any>();

  const save = () => {
    onClose(value);
  };

  const onBlur = (value: any) => {
    setValue(value);
  };

  return (
    <>
      <button
        className="flex flex-row items-center py-4 px-3 text-2xl justify-between w-full border-t-[0.5px] border-zinc-800"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom">
        <div className="flex flex-row items-center gap-4">
          <Wallet size={28} />
          alterar salário
        </div>
        <CaretRight size={14} />
      </button>

      <div
        id="offcanvasBottom"
        className="offcanvas offcanvas-bottom fixed bottom-0 flex flex-col max-w-full bg-white dark:bg-zinc-900 invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out dark:text-white left-0 right-0 border-[0.5px] dark:border-zinc-700 rounded-md h-1/2 max-h-full"
        tabIndex={-1}
        aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header flex items-center justify-between p-4">
          <h5 className="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasBottomLabel">{title}</h5>
          <button type="button"
                  className="box-content w-4 h-4 p-2 -my-5 -mr-2 dark:text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close">
            <X size={24} weight="bold"/>
          </button>
        </div>
        <div className="offcanvas-body flex-grow p-4 overflow-y-auto small">
          <div className="w-full gap-5 mt-5 flex flex-col justify-between">
            <Input
              className="dark:bg-zinc-800"
              placeholder={placeholder}
              type="number"
              icon={<Money size={24} weight="fill" />}
              onChange={onBlur}
              requiredErrorMessage="Este campo é obrigatório"
            />
            <button type="button"
                    onClick={save}
                    className="box-content bg-blue-500 p-2 rounded-md"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close">
              salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheetButton;
