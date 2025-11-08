import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';
import { useEffect, useState } from 'react';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
    const [query, setQuery] = useState(loadFromStorage);

    function loadFromStorage(): string {
        const savedQuery = localStorage.getItem('saved-query');
        if (savedQuery !== null) {
            return JSON.parse(savedQuery);
        }
        return '';
    }

    useEffect(() => {
        localStorage.setItem("saved-query", JSON.stringify(query));
    }, [query]);

    const handleSubmit = (formData: FormData) => {
        const query = formData.get('query') as string;
        const isEmptyQuery = query.trim().length === 0;

        if (isEmptyQuery) {
            toast.error('Please enter your search query.');
            return;
        }
        onSubmit(query);
        setQuery('');
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <button className={styles.button} type="submit" aria-label="Search movie">Search</button>
                </form>
            </div>
        </header>
    )

}

export default SearchBar;