<template>
  <div class="container">

    <div class="d-flex gap-3 align-items-center">
      <v-icon small @click="goHome">mdi-arrow-left</v-icon>
      <h2 class="my-4">Movie Details</h2>
    </div>
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Title: {{ movie.title }}</h3>
        <p class="card-text">Year: {{ movie.year }}</p>
        <p class="card-text"><strong>Description:</strong> {{ movie.description }}</p>
        <h4 class="mt-4">Actors:</h4>
        <ul class="row">
          <li v-for="(actor, index) in movie.actors" :key="index" class="col-lg-3 card p-2 me-3">
            <div class="me-3">
              <h5 class="mb-0">Actor Name: {{ actor.name }}</h5>
              <p class="mb-0">Age: {{ actor.age }}</p>
              <p class="mb-0">Join Date: {{ actor.joinDate }}</p>
              <p class="mb-0">Role: {{ actor.role }}</p>
            </div>
          </li>
        </ul>
        <!-- Add more details here -->
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      movie: null,
    };
  },
  computed: {
    // Retrieve the movie details using a getter
    movie() {
      const movieId = this.$route.params.id;
      return this.$store.getters.getMovieById(movieId);
    },
    methods: {
      goHome() {
        this.$router.push('/movies'); // Redirect to the movie list
      }
    }
  },
};
</script>
  