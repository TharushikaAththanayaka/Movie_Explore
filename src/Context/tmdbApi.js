// src/api/tmdbApi.js

const API_KEY = 'c632b36c2bc050c8384c7a0205faf4e3';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = {
  getTrending: async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return res.json();
  },
  searchMovies: async (query, page = 1) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return res.json();
  },
  getMovieDetails: async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
    const data = await res.json();
    return data;
  }
};

export default tmdbApi;
