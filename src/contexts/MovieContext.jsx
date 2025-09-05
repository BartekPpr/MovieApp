import { createContext, useState, useContext, useEffect, use } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites')

        if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
    }, [])

        if (favorites.length > 0) {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }

        const addFavorite = (movie) => {
            setFavorites(prev => [...prev, movie])
        }

        const removeFavorite = (movieId) => {
            setFavorites(prev => prev.filter(movie => movie.id !== movieId))
        }

        const isFavorite = (movieId) => {
            return favorites.some(movie => movie.id === movieId)
        }

        const value = { 
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite
        }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}

export default MovieContext;