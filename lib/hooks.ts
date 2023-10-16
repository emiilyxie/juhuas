'use client'

import { auth, getUser } from '@/lib/firebase'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from '@/lib/types'

export function useUserData() {
  const [authUser, loading, error] = useAuthState(auth)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    (async () => {
        console.log("changing auth")
        if (authUser) {
          console.log("get user")
          const userData = await getUser(authUser.uid)
          setUser(userData)
          console.log(userData)
        } else {
          console.log("null")
          setUser(null)
        }
      }
    )()
  }, [authUser])

  return { user, authUser }
}

// type AuthContextType = {
//   isAuthenticated: boolean;
//   user: User | null;
//   login: () => void;
//   logout: () => void;
// };

// export const AuthContext = createContext<AuthContextType>({
//   isAuthenticated: false,
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   const login = () => {
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within a AuthProvider');
//   }
//   return context;
// };