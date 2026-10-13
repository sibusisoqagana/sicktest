// student number: 223011367
// shows only saved services

import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useApp } from '../Q2Context'

const services = [
  { id: 'S1', name: 'Library Helpdesk', campus: 'APK' },
  { id: 'S2', name: 'ICT Support', campus: 'APK' },
  { id: 'S3', name: 'Career Services', campus: 'APB' },
  { id: 'S4', name: 'Academic Consultation', campus: 'SWC' }
]

export default function SavedScreen() {
  const { saved, density } = useApp()
  const compact = density === 'compact'
  const savedItems = services.filter(s => saved.includes(s.id))

  if (savedItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No saved services yet</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, compact && styles.cardCompact]}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.campus}>{item.campus}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 16 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 12 },
  cardCompact: { padding: 8, marginBottom: 6 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  campus: { fontSize: 13, color: '#888', marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#888' }
})