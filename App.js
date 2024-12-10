import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { COLOURS } from './src/database/Database'

const App = () => {
  return (
   <>
    <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content"/>
    <Navigation/>
   </>
  )
}

export default App