import './form.components.css';
import { useCallback, useEffect, useRef, useState } from 'react';

interface InputProps {
  customRef?: any;
  showErrors?: boolean;
  id?: string;
  value?: string;
  placeholder?: string;
  icon?: any;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'currency';
  required?: boolean;
  requiredErrorMessage?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: () => void;
  className?: string;
}

const Input = ({
                 customRef,
                 showErrors,
                 id,
                 value,
                 placeholder,
                 icon,
                 type,
                 required,
                 requiredErrorMessage,
                 onChange,
                 onBlur,
                 onFocus,
                 className,
               }: InputProps) => {
  const [invalid, setInvalid] = useState(showErrors);
  const ref = useRef<any>(null);

  const onChangeHandler = useCallback(() => {
    const newValue = ref.current?.value;

    if (!newValue && required) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }

    if (type === 'currency') {
      const val = newValue
        .replace(/\D/g, '')
        .replace(/(\d)(\d{2})$/, '$1,$2')
        .replace(/(?=(\d{3})+(\D))\B/g, '.');

      ref.current!.value = val;

      return onChange && onChange(val.replace(/\./g, '').replace(/,/, '.'));
    }
    onChange && onChange(newValue);
  }, [onChange]);

  const onBlurHandler = useCallback((newValue: string) => {
    onBlur && onBlur(newValue);
  }, [onBlur]);

  const onFocusHandler = useCallback(() => {
    onFocus && onFocus();
  }, [onFocus]);

  useEffect(() => setInvalid(showErrors), [showErrors]);

  useEffect(() => {
    if (value) {
      ref.current.value = value;
    }
  }, [value]);

  return (
    <>
      <div
        className={`
        ${className}
        ${invalid && 'invalid'} 
        input-wrapper
        w-full
        flex
        flex-row
        justify-center
        items-center
        px-2
        py-1
        mb-2
        rounded-md
        dark:text-zinc-100
        border-[0.5px]
        dark:bg-zinc-900
        bg-zinc-100 
        focus:outline-none
        focus:outline-hidden
        dark:hover:bg-zinc-800
        hover:bg-zinc-200
        `}
      >
        <div>{icon ?? ''}</div>
        <input
          ref={ref}
          id={id}
          type={type === 'currency' ? 'text' : type ?? 'text'}
          required={required}
          placeholder={placeholder ?? 'placeholder'}
          onChange={onChangeHandler}
          onBlur={(event) => onBlurHandler(event.target.value)}
          onFocus={onFocusHandler}
          className="w-full h-full text-lg bg-transparent border-none focus:ring-0"
        />
      </div>
      {invalid && (
        <p className="text-xs text-rose-600">
          {requiredErrorMessage ?? 'this field is required'}
        </p>
      )}
    </>
  );
};

export default Input;
