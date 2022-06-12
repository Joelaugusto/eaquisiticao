import { GetServerSidePropsContext, NextPage } from "next";
import { useState} from 'react'
import { ProfilePhotoUploader } from "../components/global/ProfilePhotoUploader";
import HomeContainer from "../components/home/HomeContainer";
import api from "../utils/api";
import session from "../utils/session";

const Settings: NextPage = (props: any) => {
  
  api.defaults.headers.common['Authorization'] = 'Bearer ' + props.token

  const profilePhoto: string = props.user.profilePhotoUrl
    ? process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + props.user.profilePhotoUrl
    : `https://avatar.oxro.io/avatar.svg?name=${
        props.user?.name ? props.user.name.replace(' ', '+') : ''
      }`


  const [image, setImage] = useState([]);

  const setPictures = (images: any) => {
    setImage(images)
    if (images[0]) {
      
      api.put('users/profile-photo', images[0])
    }
  }
  
    return(
      <HomeContainer user={ props.user} onSearch={() => { }} >
        <ProfilePhotoUploader setImages={setPictures} profilePhoto={ profilePhoto} />
      </HomeContainer>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let user

  try {
    user = await session.getLoggedUser(context)
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
      },
    }
  }

  if (!user.props) {
    return user
  }

  api.defaults.headers.common['Authorization'] =
    'Bearer ' + context.req.cookies.accessToken

  return {
    props: {
      user: user.props.user,
      token: context.req.cookies.accessToken, //change after
    },
  }
}



export default Settings;