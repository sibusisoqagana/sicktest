// student number: 223011367
// sick test entry point

import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Q1App from './Question1/Q1App'
import Q2App from './Question2/Q2App'

export default function App() {
  const [screen, setScreen] = useState('menu')

  if (screen === 'q1') return <Q1App />
  if (screen === 'q2') return <Q2App />

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DSW02B1 Sick Test</Text>
      <Text style={styles.sub}>Student 223011367</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen('q1')}>
        <Text style={styles.btnText}>Question 1 — Case Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setScreen('q2')}>
        <Text style={styles.btnText}>Question 2 — Services Dashboard</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 80, paddingHorizontal: 24 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#1a1a2e', textAlign: 'center' },
  sub: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 40 },
  btn: { backgroundColor: '#f37021', padding: 18, borderRadius: 10, marginBottom: 14, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
})