// student number: 223011367
// list of cases

import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import CaseCard from './CaseCard'

export default function CaseList({ cases, loading, error, fromCache }) {
  if (loading) {
    return <View style={styles.center}><Text style={styles.loadingText}>Loading cases...</Text></View>
  }
  if (error) {
    return <View style={styles.center}><Text style={styles.errorText}>{error}</Text></View>
  }
  if (cases.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No cases yet</Text>
        <Text style={styles.emptySub}>Add your first case above</Text>
      </View>
    )
  }
  return (
    <View>
      {fromCache && <Text style={styles.cacheNote}>Showing cached data (waiting for live update)</Text>}
      <FlatList data={cases} keyExtractor={item => item.id} renderItem={({ item }) => <CaseCard caseItem={item} uid={item.ownerUid} />} />
    </View>
  )
}

const styles = StyleSheet.create({
  center: { padding: 40, alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#555' },
  errorText: { fontSize: 15, color: '#e74c3c', textAlign: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#888' },
  emptySub: { fontSize: 14, color: '#aaa', marginTop: 4 },
  cacheNote: { fontSize: 13, color: '#f37021', fontStyle: 'italic', padding: 8, textAlign: 'center' }
})