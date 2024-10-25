<template>
    <div class="me-2">
        <button type="button" :class="{ 'btn-warning': (tech != null), 'btn-primary': (tech == null) }" class="btn"
            data-bs-toggle="modal" :data-bs-target="'#techModal' + tech?.id">
            {{ tech ? "Edit" : "New Technology" }}
        </button>

        <div class="modal fade" :id="'techModal' + tech?.id" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            {{ tech ? "Edit Technology" : "New Technology" }}y</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="title" class="form-label">Name</label>
                            <input v-model="newTech.name" type="text" class="form-control" id="title">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input v-model="newTech.description" type="text" class="form-control" id="description">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" data-bs-dismiss="modal" class="btn btn-primary"
                            @click="() => addOrUpdateTech()">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Modal from './ProjectModal.vue';
import { Technology } from '../types';

export default defineComponent({
    components: {
        Modal
    },
    props: {
        tech: {
            type: Object as PropType<Technology>
        }
    },
    emits: ["addOrUpdateTech"],
    data() {
        return {
            newTech: {
                id: this.tech ? this.tech.id : null,
                name: this.tech ? this.tech.name : "",
                description: this.tech ? this.tech.description : "",
            } as Technology
        }
    },
    methods: {
        addOrUpdateTech() {
            if (this.newTech.name.trim() == "" || this.newTech.description.trim() == "") {
                alert("fill in all fields")
                return
            }
            this.$emit("addOrUpdateTech", this.newTech)
            if (!this.tech) {
                this.newTech = {
                    id: null,
                    name: '',
                    description: ""
                }
            }
        }
    }

})
</script>
