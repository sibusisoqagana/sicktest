// student number: 223011367
// services list

import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useApp } from '../Q2Context'
import ServiceCard from '../components/ServiceCard'

const services = [
  { id: 'S1', name: 'Library Helpdesk', campus: 'APK' },
  { id: 'S2', name: 'ICT Support', campus: 'APK' },
  { id: 'S3', name: 'Career Services', campus: 'APB' },
  { id: 'S4', name: 'Academic Consultation', campus: 'SWC' }
]

export default function ServicesScreen() {
  const { saved, toggleSaved, density, hydrated } = useApp()

  if (!hydrated) {
    return <View style={styles.center}><Text>Loading...</Text></View>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            isSaved={saved.includes(item.id)}
            onToggle={() => toggleSaved(item.id)}
            density={density}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})