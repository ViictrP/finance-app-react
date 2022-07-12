import './form.components.css';
import { useCallback, useEffect, useState } from 'react';

interface InputProps {
  ref?: any;
  id?: string;
  value?: string;
  placeholder?: string;
  icon?: any;
  type?: 'text' | 'number' | 'password';
  required?: boolean;
  requiredErrorMessage?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: () => void;
}

const Input = ({
                 ref,
                 id,
                 value,
                 placeholder,
                 icon,
                 type,
                 required,
                 requiredErrorMessage,
                 onChange,
                 onBlur,
                 onFocus
               }: InputProps) => {
  const [, setInternalValue] = useState('');
  const [invalid, setInvalid] = useState(false);

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

  return (
    <>
      <div
        className={`
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
        text-zinc-100
        border-zinc-800 
        bg-zinc-900 
        focus:outline-none
        focus:outline-hidden
        hover:bg-zinc-800
        `}
      >
        <div>{icon ?? ''}</div>
        <input
          ref={ref}
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
