<template>
    <div class="card mb-3 ">
        <div class="card-body">
            <h2 class="card-title fw-bold">{{ project.title }}</h2>
            <p class="card-text">{{ project.description.substring(0, 40) + "..." }}</p>

        </div>
        <div class="card-footer d-flex">
            <a href="#" class="btn btn-primary me-2">View details</a>

            <slot />
            <button @click="$emit('delete', project.id)" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Project } from '../types';

export default defineComponent({
    props: {
        project: {
            type: Object as PropType<Project>,
            required: true
        },
    },
    emits: ["delete"],

})
</script>
