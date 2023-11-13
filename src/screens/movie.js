import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions, Text } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { fetchCreditsMovie, fetchMovieDetail, fetchSimilarMovies, image342, image500 } from '../api'
import PorgressLoader from '../components/progress-loader'

const { width, height } = Dimensions.get('window')

export default function Movie() {
    const navigation = useNavigation()
    const [isFavourite, setisFavourite] = useState(false);
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([])
    const [similarMovie, setSimilarMovie] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getMovieDetail()
        getMovieCredits()
        getSimilarMovies()
    }, [id])
    const { params: id } = useRoute()

    const getMovieDetail = async () => {
        const data = await fetchMovieDetail(id)
        setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async () => {
        const data = await fetchCreditsMovie(id)
        setCast(data.cast)
    }

    const getSimilarMovies = async () => {
        const data = await fetchSimilarMovies(id)
        setSimilarMovie(data.results)
    }


    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className={'bg-slate-900 flex-1'}>
            <View className={'w-full'}>
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
                        <Image source={{ uri: image500(movie.poster_path) }} style={{ width, height: height * 0.5 }} />
                        <Text className={'text-white text-center text-3xl -mt-9 tracking-wider font-bold'}>{movie.title}</Text>
                        <Text className={'text-white text-center text-xl mt-4 font-bold'}>{movie?.status} • {movie?.release_date?.split('-')[0]} • {movie.runtime} min</Text>
                        <View className={'flex-row items-center justify-center mt-4'}>
                            {movie.genres.map((item, idx) => (
                               <Text className={'text-white ml-1 text-bold text-xl italic'} key={idx}>{item.name} {idx + 1 !== movie.genres.length ? '•' : null}</Text>
                            ))}
                        </View>
                        <Text className={'text-white text-center mx-7 mt-10'}>{movie.overview}</Text>
                    </View>}
            </View>
        </ScrollView>
    )
}
