import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { image185 } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function Cast({cast}) {
    const navigation = useNavigation()
  return (
    <View className={'my-6'}>
        <Text className={'text-white text-center'}>Actors:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
            {
                cast && cast.map((person, idx) => (
                    <TouchableOpacity key={idx} className={'mr-4 items-center'} onPress={() => navigation.navigate('Author', person.id)}>
                    <View className={'overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 mt-5'}>
                        <Image className={'w-20 h-24 rounder-2xl'} 
                        source={{uri: image185(person.profile_path)}}/>                    
                        </View>
                        <Text className={'text-white'}>
                            {person.character.length > 10 ? person.character.slice(0, 10) + '...' : person.character}
                            </Text>
                        <Text className={'text-neutral-400 text-xs mt-2'}>
                            {person.name.length > 10 ? person.name.slice(0, 10) + '...' : person.name}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    </View>
  )
}
