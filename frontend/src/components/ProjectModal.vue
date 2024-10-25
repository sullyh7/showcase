<template>
    <div class="me-2">
        <button type="button" :class="{ 'btn-warning': (project != null), 'btn-primary': (project == null) }"
            class="btn" data-bs-toggle="modal" :data-bs-target="'#editProjectModal' + chosenProject.title">
            {{ project ? "Edit" : "New Project" }}
        </button>
        <div class="modal fade" :id="'editProjectModal' + chosenProject.title" tabindex="-1"
            :aria-labelledby="'editProjectModal' + chosenProject.title" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            {{ project ? "Edit This Project" : "New Project" }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input v-model="chosenProject.title" type="text" class="form-control" id="title">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input v-model="chosenProject.description" type="text" class="form-control"
                                id="description">
                        </div>
                        <div class="mb-3">
                            <label for="url" class="form-label">Url (Github)</label>
                            <input v-model="chosenProject.url" type="text" class="form-control" id="url">
                        </div>
                        <div class="mb-3">
                            <label for="customRange2" class="form-label">Difficulty</label>
                            <input v-model="chosenProject.difficulty" type="range" class="form-range" min="0" max="10"
                                id="customRange2">
                        </div>
                        <label for="tech1" class="form-label">Add Technologies</label>
                        <select v-model="chosenTech" id="tech1" class="mb-1 form-select"
                            aria-label="Default select example">
                            <option v-for="tech in techData.technologies" :value="{ id: tech.id, name: tech.name }"
                                :key="tech.id!">
                                {{ tech.name }}
                            </option>
                        </select>
                        <div class="mb-3">
                            <input v-model="chosenTech.how" type="text" class="form-control" id="how">
                        </div>
                        <button class="btn btn-primary btn-sm" @click="addTechnology">Add
                            technology</button>
                        <div class="x">
                            <label class="fw-bold form-label ">Chosen Technologies</label>
                            <div v-for=" (tech, i) in chosenProject.technologies" :key="i">
                                <div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                        <h6 class="card-subtitle mb-2 text-body-secondary">{{ tech.name }}</h6>
                                        <p class="card-text">{{ tech.how }}</p>
                                        <button
                                            @click="() => chosenProject.technologies = chosenProject.technologies.filter(t => t.id != tech.id)"
                                            class="btn btn-sm btn-danger"
                                            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                                            Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3 form-check">
                            <input v-model="chosenProject.funded" type="checkbox" class="form-check-input" id="funded">
                            <label class="form-check-label" for="funded">Funded?</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" data-bs-dismiss="modal"
                            @click="$emit('addOrUpdateProject', chosenProject)" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Project, ProjectTechnology, TechnologiesResponse } from "../types"
export default defineComponent({
    emits: ["addOrUpdateProject"],
    props: {
        project: {
            type: Object as PropType<Project>,
        },
        id: {
            type: Number,
        }
    },
    methods: {
        addTechnology() {
            const newTech = {
                ...this.chosenTech
            };

            if (this.chosenProject.technologies.map(t => t.id).includes(newTech.id)) {
                alert("no duplicate technologies")
                return;
            }

            if (newTech.how == "" || newTech.id == null || newTech.name == "") {
                alert("New tech fields not filled completely")
                return;
            }

            this.chosenProject.technologies.push(newTech);
            console.log(this.chosenProject.technologies)
            this.chosenTech = {
                id: null,
                name: "",
                how: "",
            };
        }
    },
    data() {
        return {
            chosenProject: {
                id: this.project ? this.project.id : null,
                title: this.project ? this.project.title : "",
                description: this.project ? this.project.description : "",
                url: this.project ? this.project.url : "",
                difficulty: this.project ? this.project.difficulty : 5,
                funded: this.project ? this.project.funded : false,
                technologies: this.project ? this.project.technologies : [],
            } as Project,
            chosenTech: {
                id: null,
                name: "",
                how: ""
            } as ProjectTechnology,

            techData: { technologies: [] } as TechnologiesResponse,
        }
    },
    async mounted() {
        const response = await fetch(`http://localhost:8000/api/technologies`)
        this.techData = await response.json() as TechnologiesResponse
    }

})
</script>
