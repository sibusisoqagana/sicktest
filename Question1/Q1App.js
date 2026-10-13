// student number: 223011367
// question 1 wrapper

import React from 'react'
import { Q1Provider } from './Q1Context'
import Q1AuthGate from './screens/Q1AuthGate'

export default function Q1App() {
  return (
    <Q1Provider>
      <Q1AuthGate />
    </Q1Provider>
  )
}