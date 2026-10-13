// student number: 223011367
// checks auth state

import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Q1LoginScreen from './Q1LoginScreen'
import Q1CasesScreen from './Q1CasesScreen'

export default function Q1AuthGate() {
  const [uid, setUid] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setUid(user ? user.uid : null)
      setChecking(false)
    })
    return () => unsub()
  }, [])

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f37021" />
        <Text style={styles.text}>Checking session...</Text>
      </View>
    )
  }

  return uid ? <Q1CasesScreen uid={uid} /> : <Q1LoginScreen />
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  text: { marginTop: 10, color: '#555' }
})