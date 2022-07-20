import './form.components.css';
import { useCallback, useEffect, useState } from 'react';

interface InputProps {
  customRef?: any;
  showErrors?: boolean;
  id?: string;
  value?: string;
  placeholder?: string;
  icon?: any;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password';
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
                 className
               }: InputProps) => {
  const [, setInternalValue] = useState('');
  const [invalid, setInvalid] = useState(showErrors);

  const onChangeHandler = useCallback((newValue: string) => {
    if (!newValue && required) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
    setInternalValue(newValue);
    onChange && onChange(newValue);
  }, [onChange]);

  const onBlurHandler = useCallback((newValue: string) => {
    setInternalValue(newValue);
    onBlur && onBlur(newValue);
  }, [onBlur]);

  const onFocusHandler = useCallback(() => {
    onFocus && onFocus();
  }, [onFocus]);

  useEffect(() => setInternalValue(value ?? ''), [value]);

  useEffect(() => setInvalid(showErrors), [showErrors]);

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
          ref={customRef}
          id={id}
          type={type ?? 'text'}
          value={value}
          required={required}
          placeholder={placeholder ?? 'placeholder'}
          onChange={(event) => onChangeHandler(event.target.value)}
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
