import { createPortal } from 'react-dom';

import css from './MovieModal.module.css';
import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import { MOVIE_IMAGE_BASE_URL } from '../../constants';


interface MovieModalProps {
    movie: null | Movie;
    onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!movie) return null;

    const { backdrop_path, title, overview, release_date, vote_average } = movie;
    const formattedRating = typeof vote_average === 'number' ? vote_average.toFixed(1) : 'N/A';
    const formattedDate = release_date
        ? new Date(release_date).toLocaleDateString(navigator.language)
        : 'Unknown';

    return createPortal(
        <div
            className={css.backdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-title"
            aria-describedby={overview ? 'movie-overview' : undefined}
        >
            <div className={css.modal}>
                <button
                    className={css.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {backdrop_path && (
                    <img
                        src={`${MOVIE_IMAGE_BASE_URL}/${backdrop_path}`}
                        alt={title ? `${title} movie poster` : 'Poster image not available'}
                        className={css.image}
                    />
                )}
                <div className={css.content}>
                    <h2 id="movie-title">{title}</h2>
                    {overview && <p id="movie-overview">{overview}</p>}
                    <p>
                        <strong>Release Date:</strong> {formattedDate}
                    </p>
                    <p>
                        <strong>Rating:</strong> {formattedRating}/10
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default MovieModal;