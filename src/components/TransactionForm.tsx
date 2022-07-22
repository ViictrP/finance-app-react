import { Button, Datepicker, Dropdown, Input } from './lib';
import { Article, Cards, CurrencyDollarSimple } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { Transaction } from '../entities';

interface TransactionFormProps {
  onSubmit: (value: Transaction) => void;
}

interface FormValue {
  title: string;
  amount: number;
  description: string;
  date: Date;
  installmentAmount: number;
  category: 'food' | 'home' | 'credit-card' | 'shop' | 'other';
}

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [formValue, setFormValue] = useState<FormValue>({} as any);
  const [formInvalid, setFormInvalid] = useState(false);
  const dropdownOptions = useRef([
    { title: 'Restaurante', value: 'food' },
    { title: 'Cartão', value: 'credit-card' },
    { title: 'Casa', value: 'home' },
    { title: 'Shop', value: 'shop' },
    { title: 'Outro', value: 'other' },
  ]);

  const handleSubmit = () => {
    onSubmit(formValue as any);
  };

  const onBlur = (value: any, input: string) => {
    const key = input as keyof typeof formValue;
    setFormValue(prevState => ({ ...prevState, [key]: value }));
  };

  const onDropdownChangeHandler = (option: string) => {
    setFormValue(prevState => ({ ...prevState, category: option } as any));
  };

  const onDateChangeHandler = (date: Date) => {
    setFormValue(prevState => ({ ...prevState, date: date } as any));
  };

  useEffect(() => {
    let invalid = true;
    if (formValue.hasOwnProperty('amount') && Number(formValue.amount) !== 0
      && formValue.hasOwnProperty('description') && formValue.description !== ''
      && formValue.hasOwnProperty('title') && formValue.title !== ''
      && formValue.hasOwnProperty('category') && (formValue.category as any) !== '') {
      invalid = false;
    }
    setFormInvalid(invalid);
  }, [formValue]);

  return (
    <form className="flex flex-col">
      <div className="mb-6">
        <Datepicker onChange={onDateChangeHandler} />
      </div>
      <div className="mb-6">
        <Dropdown
          title="categoria"
          options={dropdownOptions.current}
          onChange={onDropdownChangeHandler}
        />
      </div>
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
          placeholder="valor *"
          type="number"
          icon={<CurrencyDollarSimple size={24} weight="fill" />}
          onChange={value => onBlur(value, 'amount')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="parcelas"
          type="number"
          icon={<Cards size={24} />}
          onChange={value => onBlur(value, 'installmentAmount')}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <footer>
        <Button type="button" title="salvar" disabled={formInvalid} onClick={handleSubmit} />
      </footer>
    </form>
  );
};

export default TransactionForm;
