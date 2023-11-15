import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetchAuthorDetailed, fetchAuthorMovie, image342 } from '../api'
import PorgressLoader from './progress-loader';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import UpcomingMovie from './upcoming-movie';

const { width, height } = Dimensions.get('window')

export default function Author() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState({});
    const [authorMovie, setAuthorMovieg] = useState([]);
    const [isFavourite, setisFavourite] = useState(false);


    const { params: id } = useRoute()

    useEffect(() => {
        getAuthorDetailed()
        getAuthorMovies()
    }, [])

    const getAuthorDetailed = async () => {
        const data = await fetchAuthorDetailed(id)
        setAuthor(data)
        setLoading(false)
    }

    const getAuthorMovies = async () => {
        const data = await fetchAuthorMovie(id)
        setAuthorMovieg(data.cast);
    }
    return (
        <ScrollView className={'bg-slate-900 flex-1'} contentContainerStyle={{ paddingBottom: 10 }}>
            <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4 mt-8'}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <ChevronLeftIcon color={'white'} strokeWidth={2} size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setisFavourite(prev => !prev) }}>
                    {isFavourite ? <HeartIcon color={'red'} strokeWidth={2} size={35} /> :
                        <HeartIcon color={'white'} strokeWidth={2} size={35} />
                    }
                </TouchableOpacity>
            </SafeAreaView>
            {loading ? <PorgressLoader /> :
                <View>
                    <View className={'flex-row justify-center'} style={{ shadowColor: 'gray', shadowRadius: 40, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1 }}>
                        <View>
                            <View className={'items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2 mt-10 mx-auto'}>
                                <Image source={{ uri: image342(author?.profile_path) }} style={{ width: width * 0.74, height: height * 0.4 }} />
                            </View>
                            <View>
                                <Text className={'text-white text-center text-2xl mt-3'}>
                                    {author?.name}
                                </Text>
                                <Text className={'text-neutral-400 text-base text-center mt-2'}>
                                    {author?.place_of_birth}
                                </Text>
                            </View>
                            <View className={'mt-6 flex-row justify-between bg-neutral-900 p-2 w-11/12 mx-auto border-1 rounded-2xl'}>
                                <View className={'border-neutral-900 border-r-neutral-500 border-2 pr-4'}>
                                    <Text className={'text-white text-bace'}>Gender:</Text>
                                    <Text className={'text-neutral-400 mt-2'}>
                                        {author.gender === 1 ? 'Female' : 'Male'}
                                    </Text>
                                </View>
                                <View className={'border-neutral-900 border-r-neutral-500 border-2 pr-4'}>
                                    <Text className={'text-white text-bace'}>Birth Date:</Text>
                                    <Text className={'text-neutral-400 mt-2'}>{author.birthday ? author.birthday : 'unknown)'}</Text>
                                </View>
                                <View className={'border-neutral-900 border-r-neutral-500 border-2 pr-4'}>
                                    <Text className={'text-white text-bace'}>Known for:</Text>
                                    <Text className={'text-neutral-400 mt-2'}>{author?.known_for_department}</Text>
                                </View>
                                <View className={'border-neutral-900'}>
                                    <Text className={'text-white text-bace'}>Popularity:</Text>
                                    <Text className={'text-neutral-400 mt-2'}>{author?.popularity?.toFixed(2) + '%'}</Text>
                                </View>
                            </View>
                            <View className={'mx-4 mt-6'}>
                                <Text className={'text-white text-xl text-center'}>Biography of Actor:</Text>
                                <Text className={'text-neutral-400 mt-4 tracking-wide'}>{author?.biography}</Text>
                            </View>
                        </View>
                    </View>
                    <View className={'mt-7'}>
                        {author?.id && authorMovie.length > 0 && <UpcomingMovie upcoming={authorMovie} title={'Played on:'} />}
                    </View>
                </View>}
        </ScrollView>
    )
}
