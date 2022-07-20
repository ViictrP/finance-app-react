import { Button, Input } from './lib';
import { Article, Cards, CurrencyDollarSimple, ShoppingCart } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Transaction } from '../entities';

interface TransactionFormProps {
  onSubmit: () => void;
}

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [formValue, setFormValue] = useState<Transaction>();
  const [formInvalid, setFormInvalid] = useState(false);

  const handleSubmit = () => {
  };

  const onBlur = (value: any, input: string) => {}

  useEffect(() => {
    setFormInvalid(true);
  }, [formValue]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-5">
        <Input
          showErrors={formInvalid}
          placeholder="título *"
          icon={<Article size={24} />}
          onChange={value => onBlur(value, 'title')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          showErrors={formInvalid}
          placeholder="descrição *"
          icon={<Article size={24}  />}
          onChange={value => onBlur(value, 'description')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          showErrors={formInvalid}
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
          showErrors={formInvalid}
          placeholder="tipo *"
          type="number"
          icon={<ShoppingCart size={24} />}
          onChange={value => onBlur(value, 'category')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          showErrors={formInvalid}
          placeholder="parcelas"
          type="number"
          icon={<Cards size={24} />}
          onChange={value => onBlur(value, 'category')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <footer>
        <Button type="submit" title="salvar" disabled={formInvalid} />
      </footer>
    </form>
  );
};

export default TransactionForm;
