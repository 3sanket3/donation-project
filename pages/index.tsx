import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Home from '../views/home'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Donation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home/>
    </div>
  )
}
