// student number: 223011367
// density preference

import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useApp } from '../Q2Context'

export default function SettingsScreen() {
  const { density, setDensity } = useApp()

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Display Density</Text>

      <Pressable
        style={[styles.option, density === 'comfortable' && styles.optionActive]}
        onPress={() => setDensity('comfortable')}
      >
        <Text style={[styles.optionText, density === 'comfortable' && styles.optionTextActive]}>
          Comfortable
        </Text>
      </Pressable>

      <Pressable
        style={[styles.option, density === 'compact' && styles.optionActive]}
        onPress={() => setDensity('compact')}
      >
        <Text style={[styles.optionText, density === 'compact' && styles.optionTextActive]}>
          Compact
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 60, paddingHorizontal: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 16 },
  option: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 12, alignItems: 'center' },
  optionActive: { backgroundColor: '#f37021' },
  optionText: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  optionTextActive: { color: 'white' }
})