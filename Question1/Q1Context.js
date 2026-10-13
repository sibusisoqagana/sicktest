// student number: 223011367
// context to share auth uid and cases

import React, { createContext, useContext, useState } from 'react'

const Q1Context = createContext()

export function Q1Provider({ children }) {
  const [uid, setUid] = useState(null)
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [fromCache, setFromCache] = useState(false)
  const [error, setError] = useState('')

  return (
    <Q1Context.Provider value={{
      uid, setUid,
      cases, setCases,
      loading, setLoading,
      fromCache, setFromCache,
      error, setError
    }}>
      {children}
    </Q1Context.Provider>
  )
}

export function useQ1() {
  return useContext(Q1Context)
}