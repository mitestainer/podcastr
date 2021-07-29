import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

function MyApp({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = (episode: Episode) => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => setIsPlaying(!isPlaying)

  const setPlayingState = (state: boolean) => setIsPlaying(state)

  return (
    <div className={styles.wrapper}>
      <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, handlePlay, isPlaying, togglePlay, setPlayingState }}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </PlayerContext.Provider>
    </div>
  )
}
export default MyApp
