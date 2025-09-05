import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorite() {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites">
      <h2>
        {favorites && favorites.length > 0
          ? "Your favorite movies"
          : "No favorite movies yet"}
      </h2>
      <div className="movies-layout">
        {favorites && favorites.length > 0 ? (
          favorites.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Favorite;
