import { Button, Dropdown, Input } from './lib';
import { Article, CalendarCheck, NumberEight } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CreditCard } from '../entities';

interface FormValue {
  title: string;
  description: string;
  number: string;
  invoiceClosingDay: string;
  backgroundColor: string;
}

interface CreditCardFormProps {
  onSubmit: (value: CreditCard) => void;
}

const CreditCardForm = ({ onSubmit }: CreditCardFormProps) => {
  const [formValue, setFormValue] = useState<FormValue>({} as any);
  const [formInvalid, setFormInvalid] = useState(true);
  const dropdownOptions = useRef([
    { title: 'Cinza escuro', value: 'bg-zinc-900' },
    { title: 'Vermelho', value: 'bg-red-700' },
    { title: 'Laranja', value: 'bg-orange-500' },
    { title: 'Azul', value: 'bg-blue-500' },
    { title: 'Roxo', value: 'bg-purple-900' }
  ]);

  const onBlur = (value: string, input: string) => {
    const key = input as keyof typeof formValue;
    setFormValue(prevState => ({ ...prevState, [key]: value }));
  };

  const onDropdownChangeHandler = useCallback((option: string) => {
    const color = option !== '' ? option : dropdownOptions.current[0].value;
    setFormValue(prevState => ({ ...prevState, backgroundColor: color }));
  }, [dropdownOptions]);

  const handleSubmit = () => {
    onSubmit(formValue as any);
  };

  useEffect(() => {
    const defaultColor = dropdownOptions.current[0].value;
    setFormValue(prevState => ({ ...prevState, backgroundColor: defaultColor }));
  }, [dropdownOptions]);

  useEffect(() => {
    let invalid = true;
    if (formValue.hasOwnProperty('title') && Number(formValue.title) !== 0
      && formValue.hasOwnProperty('description') && formValue.description !== ''
      && formValue.hasOwnProperty('number') && formValue.number !== ''
      && formValue.hasOwnProperty('invoiceClosingDay') && formValue.invoiceClosingDay !== ''
      && !isNaN(Number(formValue.invoiceClosingDay))
      && !isNaN(Number(formValue.number))) {
      invalid = false;
    }
    setFormInvalid(invalid);
  }, [formValue]);

  return (
    <form className="flex flex-col">
      <div className="mb-5">
        <Input
          placeholder="título *"
          icon={<Article size={24} />}
          onChange={value => onBlur(value, 'title')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="descrição *"
          icon={<Article size={24} />}
          onChange={value => onBlur(value, 'description')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="número *"
          type="text"
          icon={<NumberEight size={24} weight="fill" />}
          onChange={value => onBlur(value, 'number')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="dia de fechamento *"
          type="text"
          icon={<CalendarCheck size={24} />}
          onChange={value => onBlur(value, 'invoiceClosingDay')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-6">
        <Dropdown
          title="cor"
          options={dropdownOptions.current}
          onChange={onDropdownChangeHandler}
        />
      </div>
      <div className="flex flex-row items-center gap-4 mb-6">
        <p>Cor do cartão</p>
        <div className={`w-10 h-4 ${formValue.backgroundColor} rounded-lg`} />
      </div>
      <footer>
        <Button type="button" title="salvar" disabled={formInvalid} onClick={handleSubmit} />
      </footer>
    </form>
  );
};

export default CreditCardForm;
