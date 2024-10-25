<template>
    <div class="card mb-3 w-100 h-100">
        <div class="card-body">
            <h2 class="card-title fw-bold">{{ technology.name }}</h2>
            <p class="card-text">{{ technology.description.substring(0, 100) + "..." }}</p>
        </div>
        <div class="card-footer d-flex">
            <a href="#" class="btn btn-primary me-2">View details</a>

            <slot />
            <button @click="$emit('delete', technology.id)" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Technology } from '../types';

export default defineComponent({
    props: {
        technology: {
            type: Object as PropType<Technology>,
            required: true
        }
    },
    emits: ["delete"]
})
</script>
