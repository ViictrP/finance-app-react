import { Money, XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Button, Input } from './lib';

interface BottomSheetProps {
  show: boolean;
  title: string;
  buttonTitle: string;
  placeholder: string;
  onClose: (value: any) => void;
}

const BottomSheet = ({ show, title, placeholder, buttonTitle, onClose }: BottomSheetProps) => {
  const [isShowing, setIsShowing] = useState(show);
  const [value, setValue] = useState<any>();

  useEffect(() => {
    setIsShowing(show);
  }, [show]);

  const hide = () => setIsShowing(false);

  const save = () => {
    onClose(value);
  };

  const onBlur = (value: any) => {
    setValue(value);
  };

  if (!isShowing) {
    return <div />;
  }

  return (
    <>
      <div id="bottom-sheet"
           className="absolute bg-zinc-900 bg-opacity-90 w-full h-full top-0 z-10 fadeIn-background" />
      <div
        className="slideUp flex flex-col items-start p-4 absolute left-2 right-2 bottom-0 h-[300px] bg-zinc-800 rounded-md shadow-2xl z-10 border-[0.5px] border-zinc-700">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-lg">{title}</p>
          <button className="pulse-single" onClick={hide}>
            <XCircle size={24} weight="fill" />
          </button>
        </div>
        <div className="w-full gap-5 mt-5 flex flex-col justify-between">
          <Input
            placeholder={placeholder}
            type="number"
            icon={<Money size={24} weight="fill" />}
            onChange={onBlur}
            requiredErrorMessage="Este campo é obrigatório"
          />
          <Button title={buttonTitle} onClick={save} />
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
