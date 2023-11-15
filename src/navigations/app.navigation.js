import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/home'
import Movie from '../screens/movie'
import Author from '../components/author'
import Search from '../components/search'

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomePage' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Movie' component={Movie} options={{ headerShown: false }} />
        <Stack.Screen name='Author' component={Author} options={{ headerShown: false }} />
        <Stack.Screen name='Search' component={Search} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
