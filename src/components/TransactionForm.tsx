import { Button, Input } from './lib';
import { IdentificationBadge } from 'phosphor-react';

interface TransactionFormProps {
  onSubmit: () => void;
}

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {

  const handleSubmit = () => {
  };

  const onBlur = (value: any, input: string) => {}

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-5">
        <Input
          placeholder="título *"
          icon={<IdentificationBadge size={24} weight="fill" />}
          onChange={value => onBlur(value, 'title')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="descrição *"
          icon={<IdentificationBadge size={24} weight="fill" />}
          onChange={value => onBlur(value, 'description')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="valor *"
          type="number"
          icon={<IdentificationBadge size={24} weight="fill" />}
          onChange={value => onBlur(value, 'amount')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="tipo *"
          type="number"
          icon={<IdentificationBadge size={24} weight="fill" />}
          onChange={value => onBlur(value, 'category')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <footer>
        <Button type="submit" title="salvar" />
      </footer>
    </form>
  );
};

export default TransactionForm;
