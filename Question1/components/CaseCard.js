// student number: 223011367
// one case card

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default function CaseCard({ caseItem, uid }) {
  async function moveStatus() {
    let next = 'Open'
    if (caseItem.status === 'Open') next = 'In Progress'
    else if (caseItem.status === 'In Progress') next = 'Resolved'
    else return

    try {
      await updateDoc(doc(db, 'users', uid, 'cases', caseItem.id), {
        status: next,
        updatedAt: serverTimestamp()
      })
    } catch (err) {
      console.log('update failed', err)
    }
  }

  async function handleDelete() {
    try {
      await deleteDoc(doc(db, 'users', uid, 'cases', caseItem.id))
    } catch (err) {
      console.log('delete failed', err)
    }
  }

  function priorityColor() {
    if (caseItem.priority === 'High') return '#e74c3c'
    if (caseItem.priority === 'Medium') return '#f39c12'
    return '#3498db'
  }

  function statusColor() {
    if (caseItem.status === 'Resolved') return '#4CAF50'
    if (caseItem.status === 'In Progress') return '#f37021'
    return '#888'
  }

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.module}>{caseItem.moduleCode}</Text>
        <View style={[styles.badge, { backgroundColor: priorityColor() }]}>
          <Text style={styles.badgeText}>{caseItem.priority}</Text>
        </View>
      </View>
      <Text style={styles.category}>{caseItem.category}</Text>
      <Text style={styles.desc}>{caseItem.description}</Text>
      <View style={[styles.statusBadge, { backgroundColor: statusColor() }]}>
        <Text style={styles.statusText}>{caseItem.status}</Text>
      </View>
      <View style={styles.actions}>
        {caseItem.status !== 'Resolved' && (
          <TouchableOpacity style={styles.statusBtn} onPress={moveStatus}>
            <Text style={styles.statusBtnText}>Next Status</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 14, borderRadius: 10, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#f37021' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  module: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  category: { fontSize: 14, color: '#666', marginTop: 6, fontWeight: '600' },
  desc: { fontSize: 14, color: '#555', marginTop: 4 },
  statusBadge: { marginTop: 8, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  statusBtn: { flex: 1, backgroundColor: '#1a1a2e', padding: 10, borderRadius: 6, alignItems: 'center' },
  statusBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  deleteBtn: { backgroundColor: '#e74c3c', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 6 },
  deleteText: { color: 'white', fontSize: 12, fontWeight: 'bold' }
})