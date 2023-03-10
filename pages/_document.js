import Document, { Html, Head, Main, NextScript } from "next/document"


class MyDocument extends Document {

     render = () => {
        
         return (
           <Html>
             <Head>
               <link rel="manifest" href="/manifest.json" />
               <link rel="apple-touch-icon" href="/logo/mobile-phone.png" />
               <meta
                 name="viewport"
                 content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
               />
             </Head>
             <body>
               <Main />
               <NextScript />
             </body>
           </Html>
         )   
    }
}

export default MyDocument;