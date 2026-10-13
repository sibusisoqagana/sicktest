// student number: 223011367
// question 2 wrapper

import React from 'react'
import { AppProvider } from './Q2Context'
import Q2Navigator from './Q2Navigator'

export default function Q2App() {
  return (
    <AppProvider>
      <Q2Navigator />
    </AppProvider>
  )
}