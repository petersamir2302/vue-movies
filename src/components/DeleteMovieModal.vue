<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="deleteMovieModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Deletion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this movie?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    methods: {
        confirmDelete() {
            // Implement logic to delete the movie here
            this.$emit('delete-confirmed'); // Emit an event to trigger the deletion in the parent component
        },
    },
};
</script>
<style scoped>
button,
[type="button"],
[type="reset"],
[type="submit"],
[role="button"] {
    color: white !important;
}</style>
  