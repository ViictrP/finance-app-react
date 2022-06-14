import { Password, User } from 'phosphor-react'
import { FormEvent, useState, useEffect } from 'react'
import { User as UserEntity } from '../../entities'

import Button from '../lib/Button'
import Input from '../lib/form/Input'

interface LoginFormProps {
  onSubmit: (user: UserEntity) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [formValue, setFormValue] = useState({ username: '', password: '' })
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  const onUserNameBlur = (value: string) => {
    const newFormValue = { ...formValue }
    newFormValue.username = value
    setFormValue(newFormValue)
  }

  const onPasswordBlur = (value: string) => {
    const newFormValue = { ...formValue }
    newFormValue.password = value
    setFormValue(newFormValue)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(formValue)
  }

  //TODO desabilitar ao apagar um campo
  useEffect(
    () =>
      setIsSubmitDisabled(
        formValue.username === '' || formValue.password === ''
      ),
    [formValue]
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <header className="mb-10">
        <p className="text-lg">Entrar</p>
        <p className="text-xs">
          Ao continuar, você concorda com nosso <b>Contrato de Usuário</b> e
          nossa
          <b> Política de Privacidade</b>
        </p>
      </header>
      <div className="mb-5">
        <Input
          placeholder="username"
          icon={<User weight="bold" />}
          onBlur={onUserNameBlur}
          required={true}
        />
      </div>
      <div className="mb-10">
        <Input
          placeholder="password"
          type="password"
          icon={<Password weight="bold" />}
          onBlur={onPasswordBlur}
          required={true}
        />
      </div>
      <footer>
        <Button type="submit" title="acessar" disabled={isSubmitDisabled} />
        <p className="text-xs mt-4">
          esqueceu o nome de{' '}
          <a href="#" className="text-sky-300 underline underline-offset-2">
            <b>usuário</b>
          </a>{' '}
          ou{' '}
          <a href="#" className="text-sky-300 underline underline-offset-2">
            <b>senha</b>
          </a>
          ?
        </p>
        <h3 className="mt-8">
          primeira vez aqui?{' '}
          <a href="#" className="text-sky-300 underline underline-offset-2">
            <b>Registre-se</b>
          </a>
        </h3>
      </footer>
    </form>
  )
}

export default LoginForm
