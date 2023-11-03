<template>
  <div class="container pt-3">
    <!-- Filter section -->
    <v-card>
      <v-card-title>
        <div class="d-flex justify-content-between">
          <span>Filter Movies</span>
          <v-btn color="success" @click="addMovie">Add Movie</v-btn>
        </div>
      </v-card-title>
      <v-card-text class="pb-0">
        <div class="row">
          <!-- Filter by Title -->
          <div class="col-lg-4">
            <v-text-field v-model="filterTitle" label="Title"></v-text-field>
          </div>
          <div class="col-lg-4">
            <!-- Filter by Year -->
            <v-text-field v-model="filterYear" label="Year" type="number"></v-text-field>
          </div>
          <div class="col-lg-4">
            <!-- Filter by Number of Actors -->
            <span>Number of Actors</span>
            <v-slider v-model="filterActors" min="0" max="100" step="1" thumb-label></v-slider>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="justify-content-end">
        <v-btn color="primary" @click="filterMovies">Filter</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Movie List Table -->
    <v-data-table :headers="headers" :items="filteredMovies" hover>
      <template v-slot:item="props">
        <tr @click="viewMovie(props.item)" class="cursor-pointer">
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.year }}</td>
          <td>{{ props.item.actors.length }}</td>
          <td>
            <v-icon small @click.stop.prevent="editMovie(props.item)">mdi-pencil</v-icon>
            <v-icon small @click.stop.prevent="deleteMovie(props.item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- Delete Movie Modal -->
    <delete-movie-modal @delete-confirmed="deleteConfirmed" />
  </div>
</template>

<script>
import DeleteMovieModal from '../components/DeleteMovieModal.vue'; // Import the modal component
export default {
  components: {
    DeleteMovieModal, // Register the modal component
  },
  data() {
    return {
      filterTitle: '',
      filterYear: null,
      filterActors: null,
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    headers() {
      return [
        { text: 'Title', value: 'title' },
        { text: 'Year', value: 'year' },
        { text: 'Actors', value: 'actors' },
        { text: 'Actions', value: 'actions', sortable: false }, // For edit/delete icons
      ];
    },
    filteredMovies() {
      return this.movies.filter((movie) => {
        const titleMatch = !this.filterTitle || movie.title.toLowerCase().includes(this.filterTitle.toLowerCase());
        const yearMatch = !this.filterYear || movie.year.toString().toLowerCase().includes(this.filterYear.toLowerCase());
        const actorsMatch = !this.filterActors || movie.actors.length === this.filterActors;
        return titleMatch && yearMatch && actorsMatch;
      });
    },
  },
  methods: {
    filterMovies() {
      // No need to change this function since it's working with the Vuex state
    },
    addMovie() {
      this.$router.push('/add-movie'); // Route to a page for adding a new movie
    },
    editMovie(movie) {
      // Implement a method to edit the selected movie
      // You can pass the movie ID to the edit page and retrieve it there
      this.$router.push(`/edit-movie/${movie.id}`);
    },

    deleteMovie(movie) {
      // Show the Bootstrap 5 modal for confirming deletion
      $('#deleteMovieModal').modal('show');

      // Store the movie to delete in a data property
      this.movieToDelete = movie;
    },

    deleteConfirmed() {
      // Implement logic to delete the movie from the store
      this.$store.commit('deleteMovie', this.movieToDelete.id);

      // Hide the modal
      $('#deleteMovieModal').modal('hide');

      // Clear the data property
      this.movieToDelete = null;
    },
    viewMovie(movie) {
      // Use Vue Router to navigate to the movie details page
      this.$router.push({ name: 'movie-details', params: { id: movie.id } });
    },
  },
};
</script>
