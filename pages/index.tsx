import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Head>
        <title>Netflix</title>
        <meta name="description" content="netflix clone" />
        <link rel="icon" href="/netflix_icon.ico" />
      </Head>

      <Header/>
      <main>
        <Banner />
        <section>
          {/* rows */}
        </section>
      </main>
      {/* modal */}
    </div>
  )
}

export default Home
