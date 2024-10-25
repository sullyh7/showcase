<template>
    <div class="container pt-3">
        <div class="h1 text-2xl fw-bolder text-center border rounded text-decoration-underline p-2 mb-3">
            Showcase
        </div>

        <nav class="navbar">
            <div class="container-fluid">
                <ul class="nav nav-tabs mb-2">
                    <li v-for="tab in tabs" :key="tab.key" class="nav-item">
                        <button @click="currentTab = tab.key" class="nav-link"
                            :class="{ active: currentTab === tab.key }">
                            {{ tab.label }}
                        </button>
                    </li>
                </ul>
                <component :is="currentModalBtn" @add-or-update-project="addOrUpdateProject"
                    @add-or-update-tech="addOrUpdateTechnology" />
            </div>
        </nav>
        <div>
            <div v-if="currentTab == 'projects'" class="row p-2">
                <div v-for="project in projData.projects" :key="project.id">
                    <div class="col">
                        <ProjectItem :project="project" @delete="deleteProject">
                            <ProjectModal @add-or-update-project="addOrUpdateProject" :project="project" />
                        </ProjectItem>
                    </div>
                </div>
            </div>
            <div v-else-if="currentTab === 'technologies'" class="row p-2">
                <div v-for="tech in techData.technologies" :key="tech.id!">
                    <div class="col">
                        <TechnologyItem :technology="tech" @delete="deleteTechnology">
                            <TechModal :tech="tech" @add-or-update-tech="addOrUpdateTechnology" />
                        </TechnologyItem>
                    </div>

                </div>
            </div>
        </div>



    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Project, ProjectsResponse, TechnologiesResponse, Technology } from "./types"
import TechnologyItem from "./components/TechnologyItem.vue";
import ProjectItem from "./components/ProjectItem.vue";
import ProjectModal from "./components/ProjectModal.vue";
import TechModal from "./components/TechModal.vue";

export default defineComponent({
    components: {
        ProjectItem,
        TechnologyItem,
        TechModal,
        ProjectModal
    },
    data() {
        return {
            projData: { projects: [] } as ProjectsResponse,
            techData: { technologies: [] } as TechnologiesResponse,
            currentTab: "projects",
            projectsFetched: false,
            technologiesFetched: false,
            tabs: [
                { key: "projects", label: "All projects" },
                { key: "technologies", label: "Technologies" },
            ],
        };

    },
    computed: {
        currentModalBtn() {
            return this.currentTab === "projects" ? "ProjectModal" : "TechModal";
        },
    },
    watch: {
        currentTab() {
            if (this.currentTab == "projects" && !this.projectsFetched) {
                console.log("refetched projects")
                this.fetchAllProjects()

            } else if (this.currentTab == "technologies" && !this.technologiesFetched) {
                console.log("refetched all tech")
                this.fetchAllTech()
            }
        }
    },
    methods: {
        async addOrUpdateTechnology(data: Technology) {
            if (data.id) {
                const response = await fetch(`http://localhost:8000/api/technologies/${data.id}`, {
                    method: "PUT",
                    body: JSON.stringify(data)
                })
                console.log(await response.json())
            } else {
                console.log("adding")
                const response = await fetch(`http://localhost:8000/api/technologies`, {
                    method: "POST",
                    body: JSON.stringify(data)
                })
                let body = await response.json()
                console.log(body)
                this.techData.technologies.push(body.technology)
            }
        },
        async deleteTechnology(id: number) {
            const response = await fetch(`http://localhost:8000/api/technologies/${id}`, {
                method: "DELETE"
            })
            console.log("deleting project with id " + id)
            this.techData.technologies = this.techData.technologies.filter(t => t.id != id)
            console.log(await response.json())
        },
        async addOrUpdateProject(data: Project) {
            if (data.id) {
                const response = await fetch(`http://localhost:8000/api/projects/${data.id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        ...data,
                        technologies: data.technologies
                    })
                })
                console.log(await response.json())
            } else {
                const response = await fetch(`http://localhost:8000/api/projects`, {
                    method: "POST",
                    body: JSON.stringify({
                        ...data,
                        technologies: data.technologies
                    })
                })
                let body = await response.json()
                console.log(body)
                this.projData.projects.push(body.project)
            }

        },
        async deleteProject(id: number) {
            const response = await fetch(`http://localhost:8000/api/projects/${id}`, {
                method: "DELETE"
            })
            console.log("deleting project with id " + id)
            this.projData.projects = this.projData.projects.filter(p => p.id != id)
        },
        async fetchAllProjects() {
            const response = await fetch(`http://localhost:8000/api/projects`)
            this.projData = await response.json() as ProjectsResponse
            this.projectsFetched = true
        },

        async fetchAllTech() {
            const response = await fetch(`http://localhost:8000/api/technologies`)
            this.techData = await response.json() as TechnologiesResponse
            this.technologiesFetched = true
        }
    },
    async mounted() {
        if (this.currentTab === 'projects') {
            this.fetchAllProjects();
        } else {
            this.fetchAllTech();
        }
    }
})
</script>
