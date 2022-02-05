import axios, { CancelTokenSource } from 'axios';

interface SearchParams {
  page: number;
  query: string;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Get request
  getMovies: (page: number, cancelTokenSource?: CancelTokenSource) =>
    instance({
      method: 'GET',
      url: 'movie/upcoming',
      cancelToken: cancelTokenSource?.token,
      params: {
        page: page,
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
      },
    }),

  search: (searchParams: SearchParams, cancelTokenSource?: CancelTokenSource) =>
    instance({
      method: 'GET',
      url: 'search/movie',
      cancelToken: cancelTokenSource?.token,
      params: {
        page: searchParams.page,
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: false,
        query: searchParams.query,
      },
    }),

  getMovieDetails: (id: number, cancelTokenSource?: CancelTokenSource) =>
    instance({
      method: 'GET',
      url: `movie/${id}`,
      cancelToken: cancelTokenSource?.token,
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    }),
};
