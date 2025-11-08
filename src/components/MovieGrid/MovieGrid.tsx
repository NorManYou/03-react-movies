
import { MOVIE_IMAGE_BASE_URL } from "../../constants";
import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";


interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

const MovieGrid = ({ onSelect, movies }: MovieGridProps) => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    movie: Movie
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(movie);
    }
  };

  return (
    <ul className={css.grid}>
      {movies.length > 0 &&
        movies.map((movie) => (
          <li
            key={movie.id}
            onClick={() => onSelect(movie)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, movie)}
            aria-label={
              movie.title
                ? `View details for ${movie.title}`
                : "View movie details"
            }
          >
            <div className={css.card}>
              {movie.poster_path && (
                <img
                  className={css.image}
                  src={`${MOVIE_IMAGE_BASE_URL}/${movie.poster_path}`}
                  alt={
                    movie.title
                      ? `${movie.title} movie poster`
                      : "Poster image not available"
                  }
                  loading="lazy"
                />
              )}
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MovieGrid;
