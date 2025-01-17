import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Button, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})




export default  function  Auth( ) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const  {   error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
     
    if (error) Alert.alert(error.message)
   
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data,
      error,
    } = await supabase.auth.signUp({
      
   email,
   password

    })



    if (error) Alert.alert(error.message)
     else{ if(data.session)
    await updateUsername(data.session.user.id)
    
    }
    setLoading(false)
  }
  async function updateUsername(userId:any) {

// const {data:{user}} = await supabase.auth.getSession();

console.log(username ,email,)
    const { data, error, status } = await supabase
      .from("UserData")
     .insert([{id:userId, username, email}])
  
    if (error) {
      console.error("Update Error:", error.message);
      console.log("status is", status)
    } else {
      console.log("Updated Data:", data);
    }
  }


  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>


      <View style={styles.verticallySpaced}>
        <TextInput
        
        
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="username"
        
         
        />
      </View>

        <TextInput
        
        
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
        
        
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
         
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail() } />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail() } />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})




