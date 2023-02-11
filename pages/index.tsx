import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState} from 'react'
import session from '../utils/session'
import api from '../utils/api'
import HomeContainer from '../components/home/HomeContainer'

const Home: NextPage = (props:any) => {

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Página Incial</h1>
    </div>
  )
}


export async function getServerSideProps(context:GetServerSidePropsContext) {

  let user:any;
  
  try {
    user = await session.getLoggedUser(context)
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
      }
    }
  }
  
  // const posts = await api.get('/posts')


  return {
    props: {
      user: user,
      // posts: posts.data.data,
    },
  }
}

export default Home
