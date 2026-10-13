// student number: 223011367
// main screen after login

import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from 'firebase/auth'
import { db, auth } from '../../firebase/config'
import CaseForm from '../components/CaseForm'
import CaseList from '../components/CaseList'

export default function Q1CasesScreen({ uid }) {
  const [cases, setCases] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [fromCache, setFromCache] = React.useState(false)

  useEffect(() => {
    let unsubscribe = null

    async function setup() {
      const cacheKey = `@uj/cases/${uid}`

      // try cache first
      try {
        const cached = await AsyncStorage.getItem(cacheKey)
        if (cached !== null) {
          setCases(JSON.parse(cached))
          setFromCache(true)
          setLoading(false)
        }
      } catch (err) {
        console.log('cache read failed', err)
      }

      // now listen for live data
      const q = query(collection(db, 'users', uid, 'cases'), orderBy('createdAt', 'desc'))
      unsubscribe = onSnapshot(
        q,
        snapshot => {
          const list = []
          snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }))
          setCases(list)
          setFromCache(false)
          setLoading(false)
          setError('')
          AsyncStorage.setItem(cacheKey, JSON.stringify(list)).catch(() => {})
        },
        err => {
          console.log('listener error', err)
          setError('')
          setLoading(false)
        }
      )
    }

    setup()

    // cleanup on logout
    return () => {
      if (unsubscribe) unsubscribe()
      setCases([])
      setFromCache(false)
    }
  }, [uid])

  async function handleLogout() {
    setCases([])
    setFromCache(false)
    await signOut(auth)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.heading}>UJ Resolution Hub</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <CaseForm uid={uid} />
      <CaseList cases={cases} loading={loading} error={error} fromCache={fromCache} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', color: '#1a1a2e' },
  logoutBtn: { backgroundColor: '#e74c3c', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  logoutText: { color: 'white', fontWeight: 'bold', fontSize: 13 }
})