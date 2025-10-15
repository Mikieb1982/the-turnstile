import { createContext, useContext } from "react"

export type User = {
  uid: string
  displayName?: string | null
  email?: string | null
  photoURL?: string | null
}

type AuthContextValue = {
  user: User | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)
export default AuthContext
