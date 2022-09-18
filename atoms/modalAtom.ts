import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'

// Storing the state of the modal
export const modalState = atom({
  key: 'modalState',
  default: false,
})

// Storing the array of movies
export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})
