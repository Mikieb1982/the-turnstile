import { createContext, useContext } from "react"

export type User = {
  uid: string
  displayName?: string | null
  email?: string | null
  photoURL?: string | null
}

export type AuthContextValue = {
  user: User | null
  /** some components use currentUser instead of user */
  currentUser: User | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  /** used in MyMatchesView */
  addPhotoToMatch?: (matchId: string, file: File) => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  currentUser: null,
  signIn: async () => {},
  signOut: async () => {},
  addPhotoToMatch: async () => {},
})

export const useAuth = () => useContext(AuthContext)
export default AuthContext
