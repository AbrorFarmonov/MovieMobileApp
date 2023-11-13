import React from 'react'
import { View, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'

const {width, height} = Dimensions.get('window')

export default function PorgressLoader() {
  return (
    <View style={{width, height}} className={'absolute flex-row justify-center items-center'}>
        <Progress.CircleSnail size={60} color={['red', 'green', 'white']} />
    </View>
  )
}
