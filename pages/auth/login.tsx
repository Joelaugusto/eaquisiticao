import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import AuthContainer from '../../components/auth/container'
import Input from '../../components/global/Input'
import { FiLogIn } from 'react-icons/fi'
import api from '../../utils/api'
import validate from '../../utils/formValidate'
import Link from 'next/link'
import cookies from '../../utils/cookies'

const Login: NextPage = (props: any) => {



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isEmailValidated, setIsEmailValidated] = useState(false)
  const [isPasswordValidated, setIsPasswordValidated] = useState(false)

  const router = useRouter()

  const resetPassword = async (e: any) => {
    e.preventDefault()

    if(isEmailValidated && isPasswordValidated){
      await api
      .post(`http://localhost:8080/api/v1/auth`, {
        password,
        email,
      })
      .then((data:any) => {
        cookies.setAccessToken(data.data.accessToken, data.data.tokenTtl)
        router.push({pathname: '/'})
      })
      .catch((error) => {})
    }
  }

  return (
    <AuthContainer title="Tela de Login!">
      <Input
        type="email"
        placeholder="Email ou número de celular"
        label="Email ou número de celular"
        error="Introduza um email válido!"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        onChangeCapture={() => {
          setIsEmailValidated(validate.emailValidate(email))
        }}
        validated={isEmailValidated}
      />
      <Input
        type="password"
        placeholder="Introduza a senha"
        label="Senha"
        error="Senha Inválida!"
        onChange={(e: any) => setPassword(e.target.value)}
        value={password}
        validated={isPasswordValidated}
        onChangeCapture={() => {
          setIsPasswordValidated(validate.validatePassword(password))
        }}
      />
      <Input
        type="submit"
        value="Entrar"
        onClick={resetPassword}
        icon={<FiLogIn size={20} />}
      />
      <span className="text-center">
        Não tem conta ainda?
        <Link href="/auth/register">
          <span className="cursor-pointer gap-2 text-emerald-400">
            Criar conta
          </span>
        </Link>
      </span>
    </AuthContainer>
  )
}

export default Login
