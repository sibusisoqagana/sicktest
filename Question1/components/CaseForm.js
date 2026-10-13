// student number: 223011367
// add case form

import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default function CaseForm({ uid }) {
  const [moduleCode, setModuleCode] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('Low')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleAdd() {
    if (moduleCode.trim() === '') { Alert.alert('Error', 'Enter module code'); return }
    if (category.trim() === '') { Alert.alert('Error', 'Enter category'); return }
    if (description.trim() === '') { Alert.alert('Error', 'Enter description'); return }

    setSaving(true)
    try {
      await addDoc(collection(db, 'users', uid, 'cases'), {
        moduleCode: moduleCode.trim(),
        category: category.trim(),
        priority,
        description: description.trim(),
        status: 'Open',
        ownerUid: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      setModuleCode('')
      setCategory('')
      setPriority('Low')
      setDescription('')
    } catch (err) {
      Alert.alert('Error', 'Could not save case')
    }
    setSaving(false)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Module Code</Text>
      <TextInput style={styles.input} value={moduleCode} onChangeText={setModuleCode} placeholder="e.g. DSW02B1" autoCapitalize="characters" />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="e.g. Assignment" />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {['Low', 'Medium', 'High'].map(level => (
          <TouchableOpacity key={level} style={[styles.priorityBtn, priority === level && styles.priorityActive]} onPress={() => setPriority(level)}>
            <Text style={[styles.priorityText, priority === level && styles.priorityTextActive]}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Describe the issue..." multiline />

      <TouchableOpacity style={[styles.btn, saving && styles.btnDisabled]} onPress={handleAdd} disabled={saving}>
        <Text style={styles.btnText}>{saving ? 'Saving...' : 'Add Case'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  form: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 16 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 6, fontSize: 15, borderWidth: 1, borderColor: '#ddd' },
  textArea: { height: 70, textAlignVertical: 'top' },
  priorityRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  priorityBtn: { flex: 1, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  priorityActive: { backgroundColor: '#f37021', borderColor: '#f37021' },
  priorityText: { color: '#333', fontWeight: 'bold', fontSize: 13 },
  priorityTextActive: { color: 'white' },
  btn: { backgroundColor: '#f37021', padding: 14, borderRadius: 8, marginTop: 16, alignItems: 'center' },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
})