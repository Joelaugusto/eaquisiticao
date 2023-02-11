import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import AuthContainer from '../../components/auth/container'
import Input from '../../components/global/Input'
import { FiLogIn } from 'react-icons/fi'
import api from '../../utils/api'
import * as Yup from 'yup'
import Link from 'next/link'
import cookies from '../../utils/cookies'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import validate from '../../utils/formValidate'

const Login: NextPage = (props: any) => {

  const router = useRouter()

  const resetPassword = async (form: {email:string, password:string}, setSubmitting: Function) => {
    
      try{
      await toast.promise(
        api
          .post(`auth`, form)
          .then((data: any) => {
            cookies.setAccessToken(data.data.accessToken, data.data.tokenTtl)
            router.push({ pathname: '/' })
          }),
          {
          pending: 'Iniciando Sessão!',
          success: 'Sessão iniciada! 👌',
          error: 'Erro ao iniciar sessão! 🤯',
        }
      )
      }catch(e){
        setSubmitting(false)
      }
      setSubmitting(false)
    }

  return (
    <AuthContainer title="Tela de Login!">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: validate.email,
          password: validate.password,
        })}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values, setSubmitting)
        }}
      >
          <Form noValidate>
            <Input
              label="Email ou celular"
              type="email"
              name="email"
              placeholder="Digite seu email ou celular"
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder='Digite sua senha'
            />
            <Input type="submit"  value='Iniciar Sessão' icon={<FiLogIn/>}/>
          </Form>
      </Formik>
      <span className="text-center">
        Não tem conta ainda?
        <Link href="/auth/register">
          <span className="cursor-pointer gap-2 text-blue-700">
            Criar conta
          </span>
        </Link>
      </span>
      <span className="text-center">
        Esqueceu a senha?
        <Link href="/auth/recovery/reset">
          <span className="cursor-pointer gap-2 text-blue-700">
            Recuperar senha
          </span>
        </Link>
      </span>
    </AuthContainer>
  )
}

export default Login
