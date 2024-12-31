import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/components/Auth'

import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import  Account  from '@/components/Account';




export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])




  return (
    <View>
      {session && session.user ? <Account session = {session}/>: <Auth/>}
    </View>
  )
}