import { api_key } from "../constants"
import { apiRequest } from "./axios"

const baseUrl = 'https://api.themoviedb.org/3'

const trendingMovie = `${baseUrl}/trending/movie/day?api_key=${api_key}`
const upComingMovie = `${baseUrl}/movie/upcoming?api_key=${api_key}`
const topRatedMovie = `${baseUrl}/movie/top_rated?api_key=${api_key}`
const popularMovie = `${baseUrl}/movie/popular?api_key=${api_key}`
const movieDetail = id => `${baseUrl}/movie/${id}?api_key=${api_key}`
const movieCredits = id => `${baseUrl}/movie/${id}/credits?api_key=${api_key}`
const similarMovie = id => `${baseUrl}/movie/${id}/similar?api_key=${api_key}`

export const fetchTrendingMovie = () => {
    return apiRequest(trendingMovie)
}

export const fetchMovieDetail = (id) => {
    return apiRequest(movieDetail(id))
}

export const fetchCreditsMovie = (id) => {
    return apiRequest(movieCredits(id))
}

export const fetchSimilarMovies = (id) => {
    return apiRequest(similarMovie(id))
}

export const fetchUpcomingMovie = () => {
    return apiRequest(upComingMovie)
}

export const fetchTopRatedgMovie = () => {
    return apiRequest(topRatedMovie)
}

export const fetchPopularMovie = () => {
    return apiRequest(popularMovie)
}

export const image500 = poster_path => {
    return poster_path ? "https://image.tmdb.org/t/p/w500" + poster_path : null
}

export const image342 = poster_path => {
    return poster_path ? "https://image.tmdb.org/t/p/w342" + poster_path : null
}

export const image185 = poster_path => {
    return poster_path ? "https://image.tmdb.org/t/p/w185" + poster_path : null
}