import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import Rows from "../components/Rows";
import useAuth from "../hooks/useAuth";
import { Movie } from "../typings";
import requests from "../utils/requests";
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import useSubscription from "../hooks/useSubscription";
import useList from "../hooks/useList";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) => {
  const { loading, user } = useAuth()
  const showModal = useRecoilValue(modalState)
  const subscription = useSubscription(user)
  const list = useList(user?.uid)

  if (loading || subscription === null) return null
  if(!subscription) return <Plans products={products} />

  return (
    <div className="relative h-screen bg-gradient-to-b">
      <Head>
        <title>Netflix</title>
        <meta name="description" content="netflix clone" />
        <link rel="icon" href="/netflix_icon.ico" />
      </Head>

      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-8">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Rows title="Trending Now" movies={trendingNow} />
          <Rows title="Top Rated" movies={topRated} />
          <Rows title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {list.length > 0 && <Rows title="My List" movies={list} />}

          <Rows title="Comedies" movies={comedyMovies} />
          <Rows title="Scary Movies" movies={horrorMovies} />
          <Rows title="Romance Movies" movies={romanceMovies} />
          <Rows title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

// Fetches the array of movies from tmdb api
export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
