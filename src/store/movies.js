import { createStore } from 'vuex';

// Initialize movies from local storage if available
const moviesFromLocalStorage = JSON.parse(localStorage.getItem('movies')) || [];

const store = createStore({
  state: {
    movies: moviesFromLocalStorage,
  },
  mutations: {
    addMovie(state, movie) {
      // Generate a unique movie ID and set it on the movie object
      movie.id = Date.now();
      state.movies.push(movie);
      // Update local storage here
      localStorage.setItem('movies', JSON.stringify(state.movies));
    },
    editMovie(state, { movieId, updatedMovie }) {
      const index = state.movies.findIndex((movie) => movie.id == movieId);
      if (index !== -1) {
        state.movies[index] = updatedMovie;
        // Update local storage here
        localStorage.setItem('movies', JSON.stringify(state.movies));
      }
    },
    deleteMovie(state, movieId) {
      state.movies = state.movies.filter((movie) => movie.id != movieId);
      // Update local storage here
      localStorage.setItem('movies', JSON.stringify(state.movies));
    },
  },
  actions: {
    // Action to add a new movie
    addMovie({ commit }, movie) {
      commit('addMovie', movie);
    },
    // Action to edit an existing movie
    editMovie({ commit }, { movieId, updatedMovie }) {
      commit('editMovie', { movieId, updatedMovie });
    },
    // Action to delete a movie
    deleteMovie({ commit }, movieId) {
      commit('deleteMovie', movieId);
    },
  },
  getters: {
    getMovieById: (state) => (movieId) => {
      // Try to find the movie in the state
      let movie = state.movies.find((movie) => movie.id === movieId);

      // If not found in state, attempt to retrieve it from local storage
      if (!movie) {
        const moviesFromLocalStorage = JSON.parse(localStorage.getItem('movies')) || [];
        movie = moviesFromLocalStorage.find((m) => m.id == movieId);
      }

      return movie;
    },
  },
});

export default store;
