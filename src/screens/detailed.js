import React from 'react'
import { Button, Text, View } from 'react-native'

const Detailed = ({navigation}) => {
  return (
    <View className="flex-1 justify-center bg-sky-600 items-center">
        <Text className="text-white text-3xl">Detailed Menu</Text>
      <Button
        title='Go for Home'
        onPress={() => navigation.navigate('HomePage')}
      />
    </View>
  )
}

export default Detailed