'use client'

import { auth, getUser } from '@/lib/firebase'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from '@/lib/types'

export function useUserData() {
  const [authUser, loading, error] = useAuthState(auth)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {(async () => {
        if (authUser) {
          const userData = await getUser(authUser.uid)
          setUser(userData)
        } else {
          setUser(null)
        }
      }
    )()
  }, [authUser])

  return { user, authUser, loading, error }
}