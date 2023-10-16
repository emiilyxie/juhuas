'use client'

import { auth, db, getUser } from '@/lib/firebase'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from '@/lib/types'
import { collection, doc, onSnapshot } from 'firebase/firestore'

export function useUserData() {
  const [authUser, loading, error] = useAuthState(auth)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let unsubscribe

    console.log(`changing auth ${authUser?.uid}`)

    if (authUser) {
      unsubscribe = onSnapshot(doc(db, `/users/${authUser.uid}`), (userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const user: User = {
            id: userDoc.id,
            username: userData.username,
            email: userData.email || '',
            role: userData.role,
            bio: userData.bio || '',
            dateJoined: userData.dateJoined,
          }
          console.log(`setting user ${user.username}`)
          setUser(user)
        } else {
          console.log("User does not exist ??")
          setUser(null)
        }
      })
    } else {
      setUser(null)
    }

    return unsubscribe
    // (async () => {
    //     console.log("changing auth")
    //     if (authUser) {
    //       console.log("get user")
    //       const userData = await getUser(authUser.uid)
    //       setUser(userData)
    //       console.log(userData)
    //     } else {
    //       console.log("null")
    //       setUser(null)
    //     }
    //   }
    // )()
  }, [authUser])

  return { user, authUser, loading, error }
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