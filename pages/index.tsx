import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import StarWarsServices from '../services/StarWars'
import Menu from '../Components/Menu/Menu'
import Character from '../Components/Character/Character'

const count = 1;

export default function Home({characters}) {

  return (
    <>
      <Head>
        <title>Star Wars</title>
        <meta name="description" content="Star Wars" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.titul}>
          <header>
            <nav>
              <Menu/>
            </nav>
          </header>
        </div>
        <Character characters={characters}/>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const response = new StarWarsServices()
  const characters = await response.getAllCharacters(count)
  return {
    props: {characters}, 
  }
}
