// student number: 223011367
// context for saved services and density

import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SAVED_KEY = '@uj/saved'
const DENSITY_KEY = '@uj/density'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [saved, setSaved] = useState([])
  const [density, setDensity] = useState('comfortable')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    async function load() {
      // read saved array independently
      try {
        const rawSaved = await AsyncStorage.getItem(SAVED_KEY)
        if (rawSaved !== null) {
          const parsed = JSON.parse(rawSaved)
          if (Array.isArray(parsed)) setSaved(parsed)
        }
      } catch (err) {
        console.log('saved parse failed', err)
      }

      // read density independently
      try {
        const rawDensity = await AsyncStorage.getItem(DENSITY_KEY)
        if (rawDensity !== null) {
          setDensity(rawDensity)
        }
      } catch (err) {
        console.log('density read failed', err)
      }

      setHydrated(true)
    }
    load()
  }, [])

  useEffect(() => {
    if (!hydrated) return
    AsyncStorage.setItem(SAVED_KEY, JSON.stringify(saved)).catch(() => {})
  }, [saved, hydrated])

  useEffect(() => {
    if (!hydrated) return
    AsyncStorage.setItem(DENSITY_KEY, density).catch(() => {})
  }, [density, hydrated])

  function toggleSaved(id) {
    setSaved(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id)
      }
      return [...prev, id]
    })
  }

  return (
    <AppContext.Provider value={{ saved, toggleSaved, density, setDensity, hydrated }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}