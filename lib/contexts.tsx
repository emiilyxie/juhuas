'use client'

import { User as FirebaseUser } from 'firebase/auth'
import { createContext } from 'react'
import { User } from './types';
import { useUserData } from './hooks';

type UserContextType = {
  user: User | null;
  authUser: FirebaseUser | null | undefined;
};

export const UserContext = createContext<UserContextType>({ user: null, authUser: null })

export const UserContextProvider = (
  { children } : 
  { children : React.ReactNode }) => {

  let value = useUserData()

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}