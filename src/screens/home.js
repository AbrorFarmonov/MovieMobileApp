import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { fetchPopularMovie, fetchTopRatedgMovie, fetchTrendingMovie, fetchUpcomingMovie } from '../api'
import TrendingMovie from '../components/trending-movie'
import UpComingMovie from '../components/upcoming-movie'
import PorgressLoader from '../components/progress-loader'

const Home = ({ navigation }) => {
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [popular, setPopular] = useState([])
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getTrendingMovie()
    getUpcomingMovie()
    getTopRatedgMovie()
    getPopularMovie()
  }, [])

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie()
    setTrending(data.results)
    setisLoading(false)
  }

  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie()
    setUpcoming(data.results)
  }

  const getTopRatedgMovie = async () => {
    const data = await fetchTopRatedgMovie()
    setTopRated(data.results)
  }

  const getPopularMovie = async () => {
    const data = await fetchPopularMovie()
    setPopular(data.results)
  }
  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView>
        <StatusBar style='light' />
        <View className="flex-row justify-between items-center mx-6 mb-5">
          <Text className="text-white text-2xl my-2">Nav Cinema</Text>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
        </View>
      </SafeAreaView>
      {isLoading ? 
        <PorgressLoader/> : 
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {trending.length > 0 && <TrendingMovie trending={trending} />}
          {upcoming.length > 0 && <UpComingMovie upcoming={upcoming} title={'Upcoming movie'} />}
          {popular.length > 0 && <UpComingMovie upcoming={popular} title={'Popular movies'} />}
          {trending.length > 0 && <TrendingMovie trending={topRated} />}
        </ScrollView>
      }
    </View>
  )
}

export default Home