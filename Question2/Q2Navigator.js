// student number: 223011367
// navigation stack

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import ServicesScreen from './screens/ServicesScreen'
import SavedScreen from './screens/SavedScreen'
import SettingsScreen from './screens/SettingsScreen'

const Stack = createNativeStackNavigator()

export default function Q2Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Saved" component={SavedScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}