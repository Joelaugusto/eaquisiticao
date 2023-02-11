import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useState} from 'react'
import AdsContainer from '../components/home/ads/container'
import PostContainer from '../components/home/post/container'
import session from '../utils/session'
import api from '../utils/api'
import HomeContainer from '../components/home/HomeContainer'

const Home: NextPage = (props:any) => {

  const [posts, setPosts] = useState<Array<any>>(props.posts)

  const onSearch = async(value:string) => {

    const data = await api.get('/posts?query=' + value)
    setPosts(data.data.data)
  }

  const postsRefresh = async () => { 
    const data = await api.get('/posts')
    setPosts(data.data.data)
  }


  return (
    <div>
      <p>Index</p>
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
  
  const posts = await api.get('/posts')


  return {
    props: {
      user: user,
      posts: posts.data.data,
    },
  }
}

export default Home
