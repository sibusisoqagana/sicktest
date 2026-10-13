// student number: 223011367
// one service card with animation

import React, { useRef, useEffect } from 'react'
import { View, Text, Pressable, Animated, StyleSheet, Easing } from 'react-native'

export default function ServiceCard({ service, isSaved, onToggle, density }) {
  const fade = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(15)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 450, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 450, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ]).start()
  }, [])

  const compact = density === 'compact'

  return (
    <Animated.View style={[styles.card, isSaved && styles.cardSaved, compact && styles.cardCompact, { opacity: fade, transform: [{ translateY }] }]}>
      <Text style={[styles.name, compact && styles.nameCompact]}>{service.name}</Text>
      <Text style={styles.campus}>{service.campus}</Text>
      <Pressable style={[styles.btn, isSaved && styles.btnSaved]} onPress={onToggle}>
        <Text style={styles.btnText}>{isSaved ? 'Saved ✓' : 'Save'}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#f37021' },
  cardSaved: { backgroundColor: '#e8f5e9', borderLeftColor: '#4CAF50' },
  cardCompact: { padding: 8, marginBottom: 6 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e' },
  nameCompact: { fontSize: 14 },
  campus: { fontSize: 13, color: '#888', marginTop: 2 },
  btn: { marginTop: 12, backgroundColor: '#1a1a2e', padding: 10, borderRadius: 6, alignItems: 'center' },
  btnSaved: { backgroundColor: '#4CAF50' },
  btnText: { color: 'white', fontWeight: 'bold' }
})