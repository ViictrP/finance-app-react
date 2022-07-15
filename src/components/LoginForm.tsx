import { Password, User } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { AuthUser as UserEntity } from '../entities';

import { Button, Input } from '../components';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onSubmit: (user: UserEntity) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const onUserNameBlur = (value: string) => {
    const newFormValue = { ...formValue };
    newFormValue.email = value;
    setFormValue(newFormValue);
  };

  const onPasswordBlur = (value: string) => {
    const newFormValue = { ...formValue };
    newFormValue.password = value;
    setFormValue(newFormValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formValue);
  };

  useEffect(
    () =>
      setIsSubmitDisabled(
        formValue.email === '' || formValue.password === ''
      ),
    [formValue]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <header className="mb-10">
        <p className="text-lg">Entrar</p>
        <p className="text-sm">
          Ao continuar, você concorda com nosso <b>Contrato de Usuário</b> e
          nossa
          <b> Política de Privacidade</b>
        </p>
      </header>
      <div className="mb-5">
        <Input
          type="email"
          placeholder="username"
          icon={<User size={24} weight="bold" className="text-zinc-900 dark:text-white"/>}
          onChange={onUserNameBlur}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <div className="mb-10">
        <Input
          placeholder="password"
          type="password"
          icon={<Password size={24} weight="bold" className="text-zinc-900 dark:text-white"/>}
          onChange={onPasswordBlur}
          required={true}
          requiredErrorMessage="Este campo é obrigatório"
        />
      </div>
      <footer>
        <Button type="submit" title="acessar" disabled={isSubmitDisabled} />
        <p className="text-xs mt-4">
          esqueceu o nome de{' '}
          <a href="src/components/LoginForm#" className="text-sky-300 underline underline-offset-2">
            <b>usuário</b>
          </a>{' '}
          ou{' '}
          <a href="src/components/LoginForm#" className="text-sky-300 underline underline-offset-2">
            <b>senha</b>
          </a>
          ?
        </p>
        <h3 className="mt-8">
          primeira vez aqui?{' '}
          <Link to="/register" className="text-sky-300 underline underline-offset-2">
            <b>Registre-se</b>
          </Link>
        </h3>
      </footer>
    </form>
  );
};

export default LoginForm;
