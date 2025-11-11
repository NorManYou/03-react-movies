import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currMovie, setCurrMovie] = useState<null | Movie>(null);


    const openModal = (movie: Movie) => {
        setIsModalOpen(true);
        setCurrMovie(movie);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrMovie(null);
    }

    const onSubmit = async (query: string) => {
        try {
            setMovies([]);
            setIsError(false);
            setIsLoading(true);
            setHasSearched(true);
            const results = await fetchMovies(query);
            setMovies(results);

        } catch {
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (hasSearched && !isError && !isLoading && movies.length === 0) {
            toast.error('No movies found for your request.');
        }
    }, [hasSearched, isLoading, movies, isError])



    return (
        <div className={css.app}>
            <SearchBar onSubmit={onSubmit} />
            {isError && <ErrorMessage />}
            {isLoading && <Loader />}
            {!isLoading && !isError && movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={openModal} />
            )}
            {isModalOpen && <MovieModal movie={currMovie} onClose={closeModal} />}
            <Toaster />
        </div>
    )
}
export default App;