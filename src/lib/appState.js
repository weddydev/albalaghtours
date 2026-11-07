import { createContext, useContext } from 'react'

/** `ready` flips true once the first-load preloader has finished. */
export const AppReady = createContext(false)
export const useAppReady = () => useContext(AppReady)
