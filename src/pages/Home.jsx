import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useState, useEffect } from "react";
import { getMovies, searchMovies } from "../services/api";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const Movies = await getMovies()
            setMovies(Movies)
        } catch (err) {
            console.log(err)
            setError('Failed to load movies')
        }
        finally {
            setLoading(false)
        }
    }
    fetchMovies()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!search.trim()) return
    if (loading) return
    setLoading(true)

    try{
        const searchResults = await searchMovies(search)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        setError('Failed to search movies')
    } finally {
        setLoading(false)
    }

    setSearch("");
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (<div className="loading">Loading</div>
        ) : (
        <div className="movies-layout">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      )};
    </div>
  );
}

export default Home;
