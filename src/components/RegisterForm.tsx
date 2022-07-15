import { At, IdentificationBadge, Lock } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { UserProfile as UserEntity } from '../entities';

import { Button, Input } from '../components';

interface LoginFormProps {
  onSubmit: (user: UserEntity) => void;
}

const RegisterForm = ({ onSubmit }: LoginFormProps) => {
  const [formValue, setFormValue] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const onBlur = (value: string, prop: keyof typeof formValue) => {
    const newFormValue = { ...formValue };
    newFormValue[prop] = value;
    setFormValue(newFormValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formValue as any);
  };

  useEffect(
    () =>
      setIsSubmitDisabled(
        formValue.email === '' || formValue.password === '' || formValue.name === ''
      ),
    [formValue]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <header className="mb-10">
        <p className="text-lg">Registrar</p>
        <p className="text-sm">preencha todos os campos obrigatórios</p>
      </header>
      <div className="mb-5">
        <Input
          placeholder="nome *"
          icon={<IdentificationBadge size={24} weight="fill" className="text-zinc-900 dark:text-white"/>}
          onChange={value => onBlur(value, 'name')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          placeholder="sobrenome"
          icon={<IdentificationBadge size={24} weight="fill" className="text-zinc-900 dark:text-white"/>}
          onChange={value => onBlur(value, 'lastname')}
          required={false}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-5">
        <Input
          type="email"
          placeholder="email *"
          icon={<At size={24} weight="fill" className="text-zinc-900 dark:text-white"/>}
          onChange={value => onBlur(value, 'email')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-10">
        <Input
          placeholder="password *"
          type="password"
          icon={<Lock size={24} weight="fill" className="text-zinc-900 dark:text-white"/>}
          onChange={value => onBlur(value, 'password')}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <footer>
        <Button type="submit" title="enviar" disabled={isSubmitDisabled} />
      </footer>
    </form>
  );
};

export default RegisterForm;
