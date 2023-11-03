<template>
  <div class="card m-3">
    <h5 class="card-header">Add Movie</h5>
    <div class="card-body">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="row">
          <div class="form-group col-lg-6">
            <label>Title</label>
            <Field name="title" type="text" class="form-control" :class="{ 'is-invalid': errors.title }" v-model="newMovie.title"></Field>
            <div class="invalid-feedback">{{ errors.title }}</div>
          </div>
          <div class="form-group col-lg-6">
            <label>Year</label>
            <Field name="year" type="number" class="form-control" :class="{ 'is-invalid': errors.year }" v-model="newMovie.year"></Field>
            <div class="invalid-feedback">{{ errors.year }}</div>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12">
            <label>Description</label>
            <Field name="description" as="textarea" class="form-control" :class="{ 'is-invalid': errors.description }" v-model="newMovie.description"></Field>
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
                  <Field :name="'actors[' + index + '].name'" type="text" class="form-control" :class="{ 'is-invalid': errors['actors[' + index + '].name'] }" v-model="actor.name"></Field>
                  <div class="invalid-feedback">{{ errors['actors[' + index + '].name'] }}</div>
                </td>
                <td>
                  <Field :name="'actors[' + index + '].age'" type="number" class="form-control" :class="{ 'is-invalid': errors['actors[' + index + '].age'] }" v-model="actor.age"></Field>
                  <div class="invalid-feedback">{{ errors['actors[' + index + '].age'] }}</div>
                </td>
                <td>
                  <Field :name="'actors[' + index + '].joinDate'" type="date" class="form-control" :class="{ 'is-invalid': errors['actors[' + index + '].joinDate'] }" v-model="actor.joinDate"></Field>
                  <div class="invalid-feedback">{{ errors['actors[' + index + '].joinDate'] }}</div>
                </td>
                <td>
                  <Field :name="'actors[' + index + '].role'" as="select" class="form-select" :class="{ 'is-invalid': errors['actors[' + index + '].role'] }" v-model="actor.role">
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
            <button @click="addActor" class="btn btn-primary">Add Actor</button>
          </div>
        </div>
        <div class="form-group mt-5 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary mr-1">Save</button>
          <button type="reset" class="btn btn-secondary">Reset</button>
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
    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      year: Yup.number().required('Year is required'),
      description: Yup.string(),
      actors: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
          age: Yup.number().required('Age is required'),
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
      newMovie: {
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
  },
};
</script>
