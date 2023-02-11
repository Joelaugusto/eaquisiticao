import Head from "next/head";
import Image from "next/image";
import pic from "../../public/pictures/auth.jpg";

const AuthContainer = (props: any) => (
  <section className="grid overflow-hidden flex">
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="md:col-span-4 h-screen flex flex-col justify-center md:items-center overflow-y-auto">
      <h1 className="my-5 text-center text-3xl mb-10">{props.title}</h1>
      <div className="flex flex-col p-4">{props.children}</div>
    </div>
  </section>
)
export default AuthContainer;