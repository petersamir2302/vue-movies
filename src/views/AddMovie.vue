<template>
  <div class="card mt-3 px-0 container">
    <h5 class="card-header">Add Movie</h5>
    <div class="card-body">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="row">
          <div class="form-group col-lg-6">
            <label>Title</label>
            <Field name="title" type="text" class="form-control" :class="{ 'is-invalid': errors.title }"
              v-model="newMovie.title"></Field>
            <div class="invalid-feedback">{{ errors.title }}</div>
          </div>
          <div class="form-group col-lg-6">
            <label>Year</label>
            <Field name="year" type="number" class="form-control" :class="{ 'is-invalid': errors.year }"
              v-model="newMovie.year"></Field>
            <div class="invalid-feedback">{{ errors.year }}</div>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12">
            <label>Description</label>
            <Field name="description" as="textarea" class="form-control" :class="{ 'is-invalid': errors.description }"
              v-model="newMovie.description"></Field>
            <div class="invalid-feedback">{{ errors.description }}</div>
          </div>
        </div>
        <h4>Actors</h4>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Join Date</th>
                <th>Actor's Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(actor, index) in newMovie.actors" :key="index">
                <td>
                  <Field :name="'actors[' + index + '].name'" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['actors[' + index + '].name'] }" v-model="actor.name"></Field>
                  <div class="invalid-feedback">{{ errors['actors[' + index + '].name'] }}</div>
                </td>
                <td>
                  <Field :name="'actors[' + index + '].age'" type="number" class="form-control"
                    :class="{ 'is-invalid': errors['actors[' + index + '].age'] }" v-model="actor.age"></Field>
                  <div class="invalid-feedback">{{ errors['actors[' + index + '].age'] }}</div>
                </td>
                <td>
                  <Field :name="'actors[' + index + '].joinDate'" type="date" class="form-control"
                    :class="{ 'is-invalid': errors['actors[' + index + '].joinDate'] }" v-model="actor.joinDate"></Field>
                  <div class="invalid-feedback">{{ errors['actors[' + index + '].joinDate'] }}</div>
                </td>
                <td>
                  <Field :name="'actors[' + index + '].role'" as="select" class="form-select"
                    :class="{ 'is-invalid': errors['actors[' + index + '].role'] }" v-model="actor.role">
                    <option value="Background role">Background role</option>
                    <option value="Cameo">Cameo</option>
                    <option value="Recurring character">Recurring character</option>
                    <option value="Side character">Side character</option>
                    <option value="Series regular">Series regular</option>
                  </Field>
                  <div class="invalid-feedback">{{ errors['actors[' + index + '].role'] }}</div>
                </td>
                <td>
                  <button @click="removeActor(index)" class="btn btn-danger">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center">
            <button type="button" @click="addActor" class="text-white btn btn-primary">Add Actor</button>
          </div>
        </div>
        <div class="form-group mt-5 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary mr-1 text-white">Save</button>
          <button @click="goHome" type="button" class="btn btn-secondary text-white">Cancel</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

export default {
  components: {
    Form,
    Field,
  },
  data() {
    const storedMovie = localStorage.getItem('newMovie');
    const initialMovie = storedMovie ? JSON.parse(storedMovie) : null;

    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      year: Yup.string()
        .required('Year is required')
        .matches(/^\d{4}$/, 'Year must be a valid date in the format YYYY'),
      description: Yup.string(),
      actors: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
          age: Yup.string()
            .required('Age is required')
            .matches(/^\d{2}$/, 'Age must be a valid age in the format'),
          joinDate: Yup.date()
            .typeError('Join date must be a valid date')
            .required('Join date is required')
            .nullable(),
          role: Yup.string().required('Role is required'),
        })
      ),
    });

    return {
      schema,
      newMovie: initialMovie || {
        title: '',
        description: '',
        year: null,
        actors: [
          {
            name: '',
            age: null,
            joinDate: '',
            role: null,
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(values) {
      // display form values on success
      localStorage.removeItem('newMovie'); // Clear the stored data
      this.$store.dispatch('addMovie', this.newMovie);
      this.$router.push('/movies'); // Redirect to the movie list
    },
    addActor() {
      this.newMovie.actors.push({
        name: '',
        age: null,
        joinDate: '',
        role: null,
      });
    },
    removeActor(index) {
      this.newMovie.actors.splice(index, 1);
    },
    goHome() {
      this.$router.push('/movies'); // Redirect to the movie list
    }
  },
  watch: {
    newMovie: {
      deep: true,
      handler(newValue) {
        // Store the data when it changes
        localStorage.setItem('newMovie', JSON.stringify(newValue));
      },
    },
  },
};
</script>
