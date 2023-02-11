import type { NextPage } from 'next'
import { useState } from 'react'

//icons
import { FcGoogle } from 'react-icons/fc'
import { FiLogIn } from 'react-icons/fi'

//components
import AuthContainer from '../../../components/auth/container'
import Input from '../../../components/global/Input'

import Head from 'next/head'
import Link from 'next/link'

import api from '../../../utils/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import validate from '../../../utils/formValidate'
import cookies from "../../../utils/cookies";

const Register: NextPage = () => {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const sendEmail = async (form: {
    email: string
    username: string
    password: string
  }) => {
    setIsSubmitting(true)

    const { email, username, password } = form

    try {

      await toast.promise(
        api.post(`users`, { email, username, password })
            .then((data: any) => {
              document.cookie = ''
              cookies.setAccessToken(data.data.token.accessToken, data.data.token.tokenTtl)
              router.push({ pathname: '/' })
            }),
          {
            pending: 'Concluindo Registro!',
            success: 'Registro concluído com sucesso! 👌',
            error: 'Erro ao concluir o registro! 🤯',
          })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Create New Account</title>
        <meta name="Register" content="Register Form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContainer title="Criar conta">
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object({
            email: validate.email,
            username: validate.name,
            password: validate.password,
            confirmPassword: validate.passwordConfirm('password'),
          })}
          onSubmit={sendEmail}
        >
          <Form className="grid" noValidate>
            <div className="grid md:grid-cols-2 md:gap-4 ">
              <Input
                type="email"
                placeholder="Introduza o seu email"
                label="Email"
                name="email"
              />
              <Input
                type="text"
                placeholder="Introduza o seu nome de utilizador"
                label="Nome de utilizador"
                name="username"
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-4">
              <Input
                type="password"
                placeholder="Introduza a senha"
                label="Senha"
                name="password"
              />
              <Input
                type="password"
                placeholder="Confirmar senha"
                label="Confirmar Senha"
                name="confirmPassword"
              />
            </div>
            <Input
              type="submit"
              value="Próximo passo"
              disabled={isSubmitting}
              icon={<FiLogIn size={20} />}
            />
          </Form>
        </Formik>
        <span className="text-center">
          Já tem conta?
          <Link href="/auth/login">
            <span className="cursor-pointer gap-2 text-blue-700">
              Iniciar sessão
            </span>
          </Link>
        </span>
      </AuthContainer>
    </div>
  )
}

export default Register
