// student number: 223011367
// home screen with saved count

import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useApp } from '../Q2Context'

export default function HomeScreen({ navigation }) {
  const { saved, density } = useApp()
  const compact = density === 'compact'

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <Text style={[styles.heading, compact && styles.headingCompact]}>UJ Campus Services</Text>
      <Text style={[styles.count, compact && styles.countCompact]}>Saved Services: {saved.length}</Text>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('Services')}>
        <Text style={styles.btnText}>Browse Services</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() => navigation.navigate('Saved')}>
        <Text style={styles.btnText}>View Saved</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.btnText}>Settings</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 60, paddingHorizontal: 20 },
  containerCompact: { paddingTop: 30 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 12 },
  headingCompact: { fontSize: 20, marginBottom: 6 },
  count: { fontSize: 18, color: '#f37021', fontWeight: 'bold', marginBottom: 24 },
  countCompact: { fontSize: 15, marginBottom: 12 },
  btn: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 12, alignItems: 'center' },
  btnText: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' }
})