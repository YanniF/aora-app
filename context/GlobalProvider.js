import { createContext, useContext, useState, useEffect} from 'react'
import {getCurrentUser} from "../lib/appwrite";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        setIsLoggedIn(!!res)
        setUser(res ?? null)
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
