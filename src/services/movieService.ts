import axios from 'axios';
import type { Movie } from '../types/movie';
import { API_BASE_URL, API_TOKEN } from '../constants';

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const {
    data: { results },
  } = await axios.get<FetchMoviesResponse>(API_BASE_URL, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return results;
};