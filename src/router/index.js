// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Movies from '../views/Movies.vue';
import AddMovie from '../views/AddMovie.vue';
import EditMovie from '../views/EditMovie.vue';
import MovieDetails from '../views/MovieDetails.vue';

const routes = [
  { path: '/', redirect: '/movies' },
  { path: '/movies', component: Movies },
  { path: '/add-movie', component: AddMovie },
  { path: '/edit-movie/:movieId', component: EditMovie },

  {
    path: '/movie/:id',
    name: 'movie-details',
    component: MovieDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
