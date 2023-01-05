import { FC } from 'react'
import Head from 'next/head'
import { Navbar } from '../../components/ui';


interface Props {
  title?: string,
  children: any
}

const origin = (typeof window === 'undefined'?  '' : window.location.origin )

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name="author" content="Jesus Eng"/>
            <meta name="description" content="Informacion sobre el pokemon XXXX" />
            <meta name="keywords" content="XXXX, pokemon, pokedex" />
            <meta property="og:title" content={`informacion sobre ${title}`} />
            <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/logo.png`} />
        </Head>

        <Navbar />
        <main style={{padding: '5px 20px'}}>
            {children}
        </main>
    </>
  )
}
